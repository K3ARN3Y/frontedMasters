//Temporary solution for Webpack problem
var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' }
  ]
};

var Menu = React.createClass({
  render () {
    var items = DATA.items.filter((item) => {
      return item.type === 'mexican';
    })
    .sort(sortBy('name'))
    .map((item) => {
      return <li key={item.id}>{item.name}</li>;
    });
    return (
      <div>
        <h1>{DATA.title}</h1>
        <ul>{items}</ul>
      </div>
    );
  }
});

React.render(<Menu/>, document.body);

