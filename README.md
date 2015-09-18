# React Notification Center

Notification center worked on top of react and inspired on Flux to dispatch events

This is prepared to be used with Webpack and written with ES6.

You should have to use a transpiler like Babel.

# Example

Add it to the root of your page:

	var NotificationCenter = require('react-notification-center');

	class MyPage extends React.Component {

		render() {
			<div>
				...
				<NotificationCenter />
				...
			</div>
		}

	}

And now you can use it from the Component you want:

	var NotificationDispatcher = require('react-notification-center').Dispatcher;

	class MyComponent extends React.Component {

		render() {
			<div>
				<button onClick={this.onClick}>Show notification</button>
			</div>
		}

		onClick() {
			NotificationDispatcher.error({title: 'Registro', message: 'Error al registrar'});
		}

	}

