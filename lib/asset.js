"use strict";

var _core = require("@babel/core");

var _pluginSvgo = _interopRequireDefault(require("@svgr/plugin-svgo"));

var _pluginJsx = _interopRequireDefault(require("@svgr/plugin-jsx"));

var _core2 = _interopRequireDefault(require("@svgr/core"));

var _presetReact = _interopRequireDefault(require("@babel/preset-react"));

var _presetEnv = _interopRequireDefault(require("@babel/preset-env"));

var _pluginTransformReactConstantElements = _interopRequireDefault(require("@babel/plugin-transform-react-constant-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable global-require, import/no-unresolved */
function requireParcel() {
  try {
    return require('parcel');
  } catch (error) {
    return require('parcel-bundler');
  }
}
/* eslint-enable global-require, import/no-unresolved */


const {
  Asset
} = requireParcel();
const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [(0, _core.createConfigItem)(_presetReact.default, {
    type: 'preset'
  }), (0, _core.createConfigItem)([_presetEnv.default, {
    modules: false
  }], {
    type: 'preset'
  })],
  plugins: [(0, _core.createConfigItem)(_pluginTransformReactConstantElements.default)]
};

class ReactSVGAsset extends Asset {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "type", 'svgr');
  }

  async parse(contents) {
    const code = await (0, _core2.default)(contents, {}, {
      caller: {
        name: '@svgr/parcel',
        defaultPlugins: [_pluginSvgo.default, _pluginJsx.default]
      },
      filePath: this.name
    });
    const {
      code: babelCode
    } = await (0, _core.transformAsync)(code, babelOptions);
    return babelCode;
  }

  async generate() {
    return [{
      type: 'svg',
      value: this.contents
    }, // original SVG (for CSS imports)
    {
      type: 'js',
      value: this.ast
    } // transformed AST (for JS imports)
    ];
  }

}

module.exports = ReactSVGAsset;