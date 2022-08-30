import React from 'react'
import Filters from './Filters'
import Item from './Item'
import './styles.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      items: [],
      loading: false,
      autoRefresh: false,
      minComments: 0,
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    this.setState({
      loading: true,
    })

    fetch('https://www.reddit.com/r/reactjs.json?limit=100')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          items: data.data.children,
          loading: false,
        })
      )
  }

  updateAutoRefresh = () => {
    if (this.state.autoRefresh) {
      this.setState({ autoRefresh: false })
      clearInterval(this.autoRefresh)
    } else {
      this.setState({ autoRefresh: true })
      this.autoRefresh = setInterval(this.getItems, 2000)
    }
  }

  updateMinComments = (event) => {
    this.setState({ minComments: event.target.value })
  }

  getItemsByComments = (items, minComments) => {
    return items
      .filter((item) => item.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments)
  }

  render() {
    const { items, loading, autoRefresh, minComments } = this.state
    const sortByCommnets = this.getItemsByComments(items, minComments)

    return (
      <div className="App">
        <h1>Top comments</h1>
        <div>
          <p>
            Current filter: <b>{minComments}</b>
          </p>
          <button
            type="button"
            className={autoRefresh ? 'button stop' : 'button'}
            onClick={this.updateAutoRefresh}
          >
            <b>{autoRefresh ? 'Stop' : 'Start'}</b> auto-refresh
          </button>
        </div>
        <Filters
          minComments={minComments}
          updateMinComments={this.updateMinComments}
        />
        {loading ? (
          <p>
            <b>...Loading...</b>
          </p>
        ) : (
          <div className="items">
            {sortByCommnets.map((item) => {
              return <Item key={item.data.id} data={item.data} />
            })}
          </div>
        )}
      </div>
    )
  }
}

export default App
