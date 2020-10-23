/**
 * Tagfield component with "tree" like dropdown
 *
 * @implementation
 * <TreeSelect
 *  data={data}
 *  label="Users"
 *  name="users"
 *  nameField="name"
 *  onChange={this.onTreeSelectChange}
 *  valueField="value"
 *  value={this.state.users}
 * />
 *
 * @description
 * For "tree" dropdown to work, value field must be represented
 * as an array of objects matching the valueField and nameField
 * criteria set above
 */

import React, { createRef, ReactNode, useCallback, useEffect, useState } from 'react'
import { arrowUpIcon, searchIcon, arrowRightIcon, closeIcon } from './icons'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

export interface TreeSelectProps {
  data: any[]
  itemRenderer?: (item: any) => ReactNode
  label?: string
  nameField: string
  onChange?: (selection: any[], dataItem: any, operation: 'addition' | 'deletion', event: any) => void
  search?: boolean
  tagRenderer?: (item: any) => ReactNode
  valueField: string
  value: any[]
}

const TreeSelect = (
  {
    data,
    itemRenderer,
    label,
    nameField,
    onChange,
    search = false,
    tagRenderer,
    valueField,
    value
  }: TreeSelectProps
) => {
  const [selection, setSelection] = useState<any[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [treeOpen, setTreeOpen] = useState<boolean>(false)
  const [criteria, setCriteria] = useState<string>('')
  const [extraCriteria, setExtraCriteria] = useState<string>('')
  const multiSelectRef: any = createRef()
  const treeDropdownRef: any = createRef()

  useEffect(() => {
    document.addEventListener('mousedown', outsideClick)
    return () => document.removeEventListener('mousedown', outsideClick)
  })

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => {
    if (data.length) {
      if (!data[0].hasOwnProperty(valueField)) {
        throw new Error(`Error: valueField "${valueField}" does not exist in data object.`)
      }

      if (!data[0].hasOwnProperty(nameField)) {
        throw new Error(`Error: nameField "${nameField}" does not exist in data object.`)
      }
    }
  }, [data, valueField, nameField])

  useEffect(() => {
    if (value) {
      setSelection(value)
    }
  }, [value])

  const outsideClick = useCallback((event: MouseEvent): void => {
    if (!multiSelectRef.current.contains(event.target)) {
      setOpen(false)
      setTreeOpen(false)
    }
  }, [multiSelectRef])

  const onKeyDown = useCallback((event: KeyboardEvent): void => {
    if (open) {
      if (event.code === 'Escape') {
        setOpen(false)
        setTreeOpen(false)
      } else if (document.activeElement && (event.code === 'Enter' || event.code === 'Space')) {
        const valueToSelect: any = document.activeElement
        const recordToSelect: any = JSON.parse(valueToSelect.dataset.record)
        let dataValue: any = data.find((item: any) => item[nameField] === recordToSelect[nameField])
        if (!dataValue) {
          dataValue = data.reduce((acc: any, curr: any) => {
            if (Array.isArray(curr[valueField])) {
              const match: any = curr[valueField].find((item: any) => item[valueField] === recordToSelect[valueField])
              if (match) {
                acc = match
              }
            }
            return acc
          }, null)
        }
        if (Array.isArray(dataValue[valueField])) {
          toggleTree()
        } else {
          const selectionIndex: number = selection.findIndex((item: any) => item[nameField] === recordToSelect[nameField])
          const newSelection: any[] = [...selection]
          if (selectionIndex > -1) {
            newSelection.splice(selectionIndex, 1)
          } else {
            newSelection.push(recordToSelect)
          }
          setSelection(newSelection)
        }
      }
    }
  }, [open, selection, data, nameField, valueField])

  const toggleDropdown = (event: any): void => {
    if (event.type === 'click' || (event.type === 'keydown' && (event.code === 'Enter' || event.code === 'Space'))) {
      setOpen(!open)
      setTreeOpen(false)
    }
  }

  const toggleTree = (): void => {
    setTreeOpen(!treeOpen)
  }

  const deleteItem = (event: MouseEvent, item: any) => {
    event.stopPropagation()
    const itemIndex: number = selection.findIndex((selected: any) => selected[valueField] === item[valueField])
    const newSelection: any[] = [...selection]
    newSelection.splice(itemIndex, 1)
    setSelection(newSelection)
    onChange && onChange(newSelection, item, 'deletion', event)
  }

  const renderTag = (item: any): ReactNode => {
    return (
      <span
        className="nix-ui-tree-select__tag"
        onClick={(e: any) => e.stopPropagation()}
        key={`nix-ui-tag-item-${item[valueField]}`}
        data-record={JSON.stringify(item)}
        tabIndex={0}
      >
        {tagRenderer ? tagRenderer(item) : item[nameField]}
        <span
          className="nix-ui-tree-select__tag-delete"
          onClick={(event: any) => deleteItem(event, item)}
          tabIndex={0}
        >
          {closeIcon}
        </span>
      </span>
    )
  }

  const onDropdownItemClick = (event: MouseEvent, item: any): void => {
    event.stopPropagation()
    if (!Array.isArray(item[valueField])) {
      const newSelection: any[] = [...selection]
      newSelection.push(item)
      setSelection(newSelection)
      onChange && onChange(newSelection, item, 'addition', event)
    }
  }

  const removeSelectedItems = (item: any): boolean => {
    const itemIndex: number = selection.findIndex((sel: any) => sel[valueField] === item[valueField])
    return itemIndex < 0
  }

  const renderDropdownItem = (item: any): ReactNode => {
    if (!Array.isArray(item[valueField])) {
      return itemRenderer ? itemRenderer(item) : item[nameField]
    } else {
      const nonSelectedItems: any[] = item[valueField].filter(removeSelectedItems)
      return nonSelectedItems.length ? (
        <span className="nix-ui-tree-select__dropdown--item__tree" onClick={toggleTree} ref={treeDropdownRef}>
          <span>{itemRenderer ? itemRenderer(item) : item[nameField]}</span>
          {treeOpen ? <span style={{ transform: 'rotate(180deg)' }}>{arrowRightIcon}</span> :
            <span>{arrowRightIcon}</span>}
          <CSSTransition
            in={treeOpen}
            timeout={500}
            unmountOnExit
            classNames="nix-ui-tree-select__fadeIn--tree"
          >
            <div className="nix-ui-tree-select__tree-container">
              <div className="nix-ui-tree-select__dropdown">
                {search && (
                  <div className="nix-ui-tree-select__input-container">
                    <input
                      type="text"
                      value={extraCriteria}
                      onChange={(event: any) => setExtraCriteria(event.target.value)}
                      onClick={(event: any) => event.stopPropagation()}
                    />
                    <span className="nix-ui-tree-select__floating-icon">
                    {searchIcon}
                  </span>
                  </div>
                )}
                {renderDropdown(nonSelectedItems, extraCriteria)}
              </div>
            </div>
          </CSSTransition>
        </span>
      ) : <span className="nix-ui-tree-select__disabled">{item[nameField]}</span>
    }
  }

  const applyFilter = (search: string, item: any): boolean => {
    return item[nameField].includes(search)
  }

  const renderDropdown = (data: any[], search: string): ReactNode => {
    return data.length ? (
      data
        .filter(removeSelectedItems)
        .filter((item: any) => applyFilter(search, item))
        .map((item: any) => (
          <span
            className="nix-ui-tree-select__dropdown--item"
            onClick={(event: any) => onDropdownItemClick(event, item)}
            key={`nix-ui-dropdown-item-${item[valueField]}`}
            data-record={JSON.stringify(item)}
            tabIndex={0}
          >
            {renderDropdownItem(item)}
          </span>
        ))
    ) : (
      <span className="nix-ui-tree-select__no-data">No Data</span>
    )
  }

  return (
    <div className="nix-ui-tree-select" ref={multiSelectRef}>
      {label && <label className="nix-ui-tree-select__label" htmlFor={nameField}>{label}</label>}
      <div className="nix-ui-tree-select__input-container">
        <div className="nix-ui-tree-select__input" onClick={toggleDropdown} aria-expanded={open}
             onKeyDown={toggleDropdown}>
          <div className="nix-ui-tree-select__tags">
            {selection.map((item: any) => renderTag(item))}
          </div>
          <span className="nix-ui-tree-select__input-indicator" tabIndex={0}>
            {open ? <span>{arrowUpIcon}</span> : <span style={{ transform: 'rotate(180deg)' }}>{arrowUpIcon}</span>}
          </span>
        </div>
      </div>
      <CSSTransition
        in={open}
        timeout={500}
        unmountOnExit
        classNames="nix-ui-tree-select__fadeIn"
      >
        <div className="nix-ui-tree-select__dropdown">
          {search &&
          <div className="nix-ui-tree-select__input-container">
            <input type="text" value={criteria} onChange={(event: any) => setCriteria(event.target.value)} />
            <span className="nix-ui-tree-select__floating-icon">
              {searchIcon}
            </span>
          </div>
          }
          {renderDropdown(data, criteria)}
        </div>
      </CSSTransition>
    </div>
  )
}

export default TreeSelect
