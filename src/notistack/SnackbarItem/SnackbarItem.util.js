'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.variantIcon = exports.TransitionComponent = exports.muiClasses = exports.getMuiClasses = exports.getTransitionDirection = exports.defaultAnchorOrigin = exports.capitalise = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _SvgIcon = require('@material-ui/core/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckIcon = function CheckIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z'
        })
    );
};

var WarningIcon = function WarningIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z' })
    );
};

var ErrorIcon = function ErrorIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41, 20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53, 2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16, 14.59L13.41,12L16,9.41L14.59,8Z'
        })
    );
};

var InfoIcon = function InfoIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z'
        })
    );
};

var TransitionComponent = function TransitionComponent(props) {
    return _react2.default.createElement(_Slide2.default, props);
};

var iconStyles = {
    opacity: 0.9,
    fontSize: 20,
    marginRight: 8
};

var variantIcon = {
    success: _react2.default.createElement(CheckIcon, { style: iconStyles }),
    warning: _react2.default.createElement(WarningIcon, { style: iconStyles }),
    error: _react2.default.createElement(ErrorIcon, { style: iconStyles }),
    info: _react2.default.createElement(InfoIcon, { style: iconStyles })
};

var DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down'
};

var defaultAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
};

var muiClasses = {
    root: {},
    anchorOriginTopCenter: {},
    anchorOriginBottomCenter: {},
    anchorOriginTopRight: {},
    anchorOriginBottomRight: {},
    anchorOriginTopLeft: {},
    anchorOriginBottomLeft: {}
};

/**
 * returns transition direction according the the given anchor origin
 * @param {object} anchorOrigin
 */
var getTransitionDirection = function getTransitionDirection() {
    var anchorOrigin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultAnchorOrigin;

    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * Capitalises a piece of string
 * @param {string} text
 */
var capitalise = function capitalise(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Filteres classes object and returns the keys that are allowed
 * in material-ui snackbar classes prop
 * @param {object} classes
 */
var getMuiClasses = function getMuiClasses(classes) {
    return Object.keys(classes).filter(function (key) {
        return muiClasses[key] !== undefined;
    }).reduce(function (obj, key) {
        return _extends({}, obj, _defineProperty({}, key, classes[key]));
    }, {});
};

exports.capitalise = capitalise;
exports.defaultAnchorOrigin = defaultAnchorOrigin;
exports.getTransitionDirection = getTransitionDirection;
exports.getMuiClasses = getMuiClasses;
exports.muiClasses = muiClasses;
exports.TransitionComponent = TransitionComponent;
exports.variantIcon = variantIcon;