require('./NotificationCenter.scss');

var uuid = function () {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
      case 8:
      case 20:
        uuid += '-';
        uuid += (Math.random() * 16 | 0).toString(16);
        break;
      case 12:
        uuid += '-';
        uuid += '4';
        break;
      case 16:
        uuid += '-';
        uuid += (Math.random() * 4 | 8).toString(16);
        break;
      default:
        uuid += (Math.random() * 16 | 0).toString(16);
      }
    }
    return uuid;
  };

class NotificationItem extends React.Component {

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'notification': true,
			'notification-in': true,
			'notification-error': this.props.notificationType == 'error',
			'notification-warn': this.props.notificationType == 'warn',
			'notification-info': this.props.notificationType == 'info'
		});
		return (
			<div className={classes}>
				<span className="notification-close">✖</span>
				<div className="notification-title">
					<span className="notification-title">{this.props.title}</span>
				</div>
				<div className="notification-content">
					<span>{this.props.message}</span>
				</div>
			</div>
		);
	}

}

var Dispatcher = require('./NotificationDispatcher.js');

class NotificationCenter extends React.Component {

	constructor(props) {
		super(props);
		Dispatcher.bindListener(this);
		this.state = {
			notifications: []
		};
	}

	error(options) {
		options.notificationType = 'error';
		this.show(options);
	}

	warn(options) {
		options.notificationType = 'warn';
		this.show(options);
	}

	info(options) {
		options.notificationType = 'info';
		this.show(options);
	}

	show(options) {
		var notificationUUID = uuid();
		this.state.notifications.push({title: options.title, message: options.message, notificationType: options.notificationType, uuid: notificationUUID});
		this.setState({
			notifications: this.state.notifications
		});
		setTimeout(() => {
			this.state.notifications.splice(0,1);
			this.setState({
				notifications: this.state.notifications
			});
		}, 4000);
	}


	render() {
		var notificationsNodes = this.state.notifications.map(function (notification, index) {
			return (
				<NotificationItem message={notification.message} title={notification.title} notificationType={notification.notificationType} />
			);
		});
		return (
			<div className="notification-center">
				{notificationsNodes}
			</div>
		);
	}

}

module.exports = NotificationCenter;