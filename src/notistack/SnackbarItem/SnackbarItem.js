/* eslint-disable */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _RootRef = require('@material-ui/core/RootRef');

var _RootRef2 = _interopRequireDefault(_RootRef);

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _SnackbarContent = require('@material-ui/core/SnackbarContent');

var _SnackbarContent2 = _interopRequireDefault(_SnackbarContent);

var _SnackbarItem = require('./SnackbarItem.styles');

var _SnackbarItem2 = require('./SnackbarItem.util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnackbarItem = function (_Component) {
    _inherits(SnackbarItem, _Component);

    function SnackbarItem(props) {
        _classCallCheck(this, SnackbarItem);

        var _this = _possibleConstructorReturn(this, (SnackbarItem.__proto__ || Object.getPrototypeOf(SnackbarItem)).call(this, props));

        _this.handleClose = function (key) {
            return function (event, reason) {
                var _this$props = _this.props,
                    onClose = _this$props.onClose,
                    singleOnClose = _this$props.snack.onClose;

                if (reason === 'clickaway') return;
                if (singleOnClose) singleOnClose(event, reason, key);
                onClose(event, reason, key);
            };
        };

        _this.handleExited = function (key) {
            return function (event) {
                var _this$props2 = _this.props,
                    onExited = _this$props2.onExited,
                    singleOnExited = _this$props2.snack.onExited;

                if (singleOnExited) singleOnExited(event, key);
                onExited(event, key);
            };
        };

        _this.componentDidMount = function () {
            var _this$props3 = _this.props,
                onSetHeight = _this$props3.onSetHeight,
                snack = _this$props3.snack;

            var height = _this.ref.current.clientHeight;
            onSetHeight(snack.key, height);
        };

        _this.ref = _react2.default.createRef();
        return _this;
    }

    _createClass(SnackbarItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                action = _props.action,
                _props$anchorOrigin = _props.anchorOrigin,
                anchorOrigin = _props$anchorOrigin === undefined ? _SnackbarItem2.defaultAnchorOrigin : _props$anchorOrigin,
                _props$ContentProps = _props.ContentProps,
                ContentProps = _props$ContentProps === undefined ? {} : _props$ContentProps,
                hideIconVariant = _props.hideIconVariant,
                iconVariant = _props.iconVariant,
                offset = _props.offset,
                snack = _props.snack,
                style = _props.style,
                onClickAction = _props.onClickAction,
                onSetHeight = _props.onSetHeight,
                other = _objectWithoutProperties(_props, ['classes', 'action', 'anchorOrigin', 'ContentProps', 'hideIconVariant', 'iconVariant', 'offset', 'snack', 'style', 'onClickAction', 'onSetHeight']);

            var contentAction = ContentProps.action,
                className = ContentProps.className,
                otherContentProps = _objectWithoutProperties(ContentProps, ['action', 'className']);

            var key = snack.key,
                _snack$variant = snack.variant,
                variant = _snack$variant === undefined ? 'default' : _snack$variant,
                singleSnackProps = _objectWithoutProperties(snack, ['key', 'variant']);

            var icon = iconVariant[variant];

            var contentProps = _extends({}, otherContentProps, singleSnackProps.ContentProps, {
                action: snack.action || contentAction || action
            });

            var onClickHandler = snack.action ? snack.onClickAction : onClickAction;
            onClickHandler = onClickHandler || this.handleClose(key);

            var anchOrigin = singleSnackProps.anchorOrigin || anchorOrigin;

            return _react2.default.createElement(
                _RootRef2.default,
                { rootRef: this.ref },
                _react2.default.createElement(
                    _Snackbar2.default,
                    _extends({
                        autoHideDuration: 5000,
                        anchorOrigin: anchOrigin,
                        TransitionComponent: _SnackbarItem2.TransitionComponent,
                        TransitionProps: {
                            direction: (0, _SnackbarItem2.getTransitionDirection)(anchOrigin)
                        },
                        style: _extends({}, style, (0, _SnackbarItem.getTransitionStyles)(offset, anchOrigin))
                    }, other, singleSnackProps, {
                        open: snack.open,
                        classes: (0, _SnackbarItem2.getMuiClasses)(classes),
                        onClose: this.handleClose(key),
                        onExited: this.handleExited(key)
                    }),
                    snack.children || _react2.default.createElement(_SnackbarContent2.default, _extends({
                        className: (0, _classnames2.default)(classes.base, classes['variant' + (0, _SnackbarItem2.capitalise)(variant)], !hideIconVariant && icon ? classes.lessPadding : null, className)
                    }, contentProps, {
                        'aria-describedby': 'client-snackbar',
                        message: _react2.default.createElement(
                            'span',
                            { id: 'client-snackbar', className: classes.message },
                            !hideIconVariant ? icon : null,
                            snack.message
                        ),
                        action: contentProps.action && _react2.default.createElement(
                            'span',
                            { onClick: onClickHandler },
                            contentProps.action
                        )
                    }))
                )
            );
        }
    }]);

    return SnackbarItem;
}(_react.Component);

SnackbarItem.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    /**
     * offset from top/bottom of the screen where a snakcbar should be displayed
     * (when snackbars are stacked on top of eachother)
     */
    offset: _propTypes2.default.number.isRequired,
    snack: _propTypes2.default.shape({
        /**
         * Text of the snackbar/notification.
         */
        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]).isRequired,
        /**
         * Type of snackbar. defaulted to 'default'.
         */
        variant: _propTypes2.default.oneOf(['default', 'error', 'success', 'warning', 'info']),
        /**
         * Event fired when clicked on action button of
         * a snackbar. defaulted to dismiss the snackbar.
         */
        onClickAction: _propTypes2.default.func,
        /**
         * Identifier of a given snakcbar.
         */
        key: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
        /**
         * Whether or not a snackbar is visible or hidden.
         */
        open: _propTypes2.default.bool.isRequired
    }).isRequired,
    /**
     * Little icon that is displayed at left corner of a snackbar.
     */
    iconVariant: _propTypes2.default.shape({
        /**
         * Icon displayed when variant of a snackbar is set to `success`.
         */
        success: _propTypes2.default.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `warning`.
         */
        warning: _propTypes2.default.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `error`.
         */
        error: _propTypes2.default.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `info`.
         */
        info: _propTypes2.default.any.isRequired
    }),
    /**
     * iconVariant will not be rendered if set to `true`.
     */
    hideIconVariant: _propTypes2.default.bool,
    /**
     * Event fired when clicked on action button of
     * a snackbar. defaulted to dismiss the snackbar.
     */
    onClickAction: _propTypes2.default.func,
    onClose: _propTypes2.default.func.isRequired,
    onExited: _propTypes2.default.func.isRequired,
    onSetHeight: _propTypes2.default.func.isRequired
};

SnackbarItem.defaultProps = {
    iconVariant: _SnackbarItem2.variantIcon,
    hideIconVariant: false,
    onClickAction: undefined
};

exports.default = (0, _styles.withStyles)(_SnackbarItem.styles)(SnackbarItem);
