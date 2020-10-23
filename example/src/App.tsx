import React, { Component } from 'react'
import TreeSelect from 'nix-ui-tree-select'

class App extends Component {
  state = {
    users: []
  }

  onTreeSelectChange = (users: any) => {
    this.setState({ users })
  }

  itemRenderer = (item: any) => {
    if (Array.isArray(item.value)) {
      return <span style={{ color: 'royalblue', fontWeight: 'bold' }}>{item.name}</span>
    } else {
      return <span>{item.name}</span>
    }
  }

  render() {
    return (
      <div className="App" style={{ padding: '20px' }}>
        <div style={{ width: '250px' }}>
          <TreeSelect
            data={data}
            label="Users"
            nameField="name"
            onChange={this.onTreeSelectChange}
            search
            valueField="value"
            value={this.state.users}
            itemRenderer={this.itemRenderer}
          />
        </div>
      </div>
    )
  }
}

export default App

const data = [{
  name: 'pm1',
  value: 1
}, {
  name: 'pm2',
  value: 2
}, {
  name: 'pm3',
  value: 3
}, {
  name: 'org1',
  value: [{
    name: 'orgUser1',
    value: 11
  }, {
    name: 'orgUser2',
    value: 12
  }, {
    name: 'orgUser3',
    value: 13
  }, {
    name: 'orgUser4',
    value: 14
  }, {
    name: 'orgUser5',
    value: 15
  }, {
    name: 'orgUser6',
    value: 16
  }, {
    name: 'orgUser7',
    value: 17
  }, {
    name: 'orgUser8',
    value: 18
  }]
}]
