/* eslint-disable */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTransitionStyles = exports.styles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _green = require('@material-ui/core/colors/green');

var _green2 = _interopRequireDefault(_green);

var _amber = require('@material-ui/core/colors/amber');

var _amber2 = _interopRequireDefault(_amber);

var _SnackbarItem = require('./SnackbarItem.util');

var _constants = require('../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = exports.styles = function styles(theme) {
    return _extends({}, _SnackbarItem.muiClasses, {
        base: {
            fontSize: '0.875rem',
            lineHeight: '1.46429em',
            fontWeight: theme.typography.fontWeightRegular,
            fontFamily: theme.typography.fontFamily
        },
        lessPadding: {
            paddingLeft: theme.spacing.unit * 2.5
        },
        variantSuccess: {
            backgroundColor: _green2.default[600]
        },
        variantError: {
            backgroundColor: theme.palette.error.dark
        },
        variantInfo: {
            backgroundColor: '#2979ff' // nice blue
        },
        variantWarning: {
            backgroundColor: _amber2.default[700]
        },
        message: {
            display: 'flex',
            alignItems: 'center'
        }
    });
};

/**
 * @param {object} anchorOrigin - how snack is postioned. e.g.
 * { vertical: 'bottom', horizontal: 'left' }
 * @param {number} level - Level on which snakcbar should be displayed
 * (when snackbars are stacked on top of eachother)
 * @returns {object}
 */
var getTransitionStyles = exports.getTransitionStyles = function getTransitionStyles(offset, anchorOrigin) {
    return Object.assign(_defineProperty({}, anchorOrigin.vertical, offset), {
        WebKitTransition: 'all ' + _constants.TRANSITION_DOWN_DURATION + 'ms',
        MozTransition: 'all ' + _constants.TRANSITION_DOWN_DURATION + 'ms',
        msTransition: 'all ' + _constants.TRANSITION_DOWN_DURATION + 'ms',
        OTransition: 'all ' + _constants.TRANSITION_DOWN_DURATION + 'ms',
        transition: 'all ' + _constants.TRANSITION_DOWN_DURATION + 'ms',
        transitionDelay: _constants.TRANSITION_DELAY + 'ms'
    });
};
