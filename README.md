# @nix-ui/tree-select

> Cascading tagfield - React Component

[![NPM](https://img.shields.io/npm/v/nix-ui-tree-select.svg)](https://www.npmjs.com/package/nix-ui-tree-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nix-ui-tree-select
```

## Usage

```tsx
import React, { Component } from 'react'
import TreeSelect from 'nix-ui-tree-select'

class App extends Component {
  state = {
    users: []
  }

  onTreeSelectChange = (users: any) => {
    this.setState({ users })
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
  name: 'org',
  value: [{
    name: 'org1',
    value: 11
  }, {
    name: 'org2,
    value: 12
  }]
}]

```

## License

MIT © [NicolasBG87](https://github.com/NicolasBG87)
