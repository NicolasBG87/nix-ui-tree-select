// @ts-ignore
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  & * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline-color: #e6e7e8;
    font-family: 'Open Sans', sans-serif;
    color: #414042;
  }
`

export const Tag = styled.span`
  padding: 3px;
  background-color: #f1f2f2;
  border: 1px solid #414042;
  margin: 1px;
  border-radius: 3px;
  position: relative;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TagDeleteIcon = styled.span`
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  border-radius: 3px;

  &:hover {
    background-color: #ff9ca1;
  }

  & svg {
    transform: scale(0.7);
  }
`

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 46px;
  border: 1px solid #D1D3D4;
  border-radius: 3px;
  padding: 5px;
}
`

export const InputContainer = styled.div`
  width: 100%;
  position: relative;

  & input {
    width: calc(100% - 10px);
    padding: 5px 25px 5px 5px;
    min-height: 25px;
    margin: 5px;
    border-radius: 3px;
    border: 1px solid #d1d3d4;
  }
`

export const Tags = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
  flex-wrap: wrap;
`

export const InputIndicator = styled.span`
  position: absolute;
  top: 10px;
  right: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease-in-out;
  }
`

export const Dropdown = styled.div`
  border: none;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`

export const DropdownItem = styled.span`
  padding: 5px 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #f1f2f2;
  }

  &:focus {
    background-color: #f1f2f2;
  }
`

export const DropdownItemTree = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease-in-out;
  }
`

export const TreeContainer = styled.div`
  position: absolute;
  top: 0;
  right: -5px;
  transform: translateX(100%);
`

export const Disabled = styled.span`
  color: gray;
`

export const FloatingIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 7px;
`
