var tweenState = require('../');
var React = require('react');

function translateXStyle(val) {
    return {
        transform: 'translateZ(0) translateX(' + val + 'px)',
        WebkitTransform: 'translateZ(0) translateX(' + val + 'px)',
    };
}

var App = React.createClass({
    mixins: [tweenState.Mixin],

    getInitialState: function() {
        return {
            blocks: [0, 0, 0]
        };
    },

    handleTweenClick: function() {
        // If you want to update nested values in your state, use this API instead.
        this.tweenState(function(state) {return state.blocks;}, '0', {
            easing: tweenState.easingTypes.easeInOutQuad,
            duration: 1000,
            endValue: this.state.blocks[0] === 0 ? 400 : 0,
        });
        this.tweenState(function(state) {return state.blocks;}, '1', {
            easing: tweenState.easingTypes.easeInOutBounce,
            duration: 1000,
            endValue: this.state.blocks[1] === 0 ? 400 : 0,
        });
        this.tweenState(function(state) {return state.blocks;}, '2', {
            easing: tweenState.easingTypes.iosDefaultSpring,
            duration: 1000,
            endValue: this.state.blocks[2] === 0 ? 400 : 0,
        });
    },

    render: function() {
        var block1Style = translateXStyle(
            this.getTweeningValue(function(state) {return state.blocks;}, '0')
        );
        var block2Style = translateXStyle(
            this.getTweeningValue(function(state) {return state.blocks;}, '1')
        );
        var block3Style = translateXStyle(
            this.getTweeningValue(function(state) {return state.blocks;}, '2')
        );

        return (
            <div style={{padding: 10}}>
            <div>
            <button onClick={this.handleTweenClick}>Click Me Repeatedly</button>
            </div>

            Ease in out quad
            <div className="boundingBoxStyle">
            <div className="block" style={block1Style} />
            </div>

            Ease in out elastic
            <div className="boundingBoxStyle">
            <div className="block" style={block2Style} />
            </div>

            iOS spring
            <div className="boundingBoxStyle">
            <div className="block" style={block3Style} />
            </div>
            </div>
        );
    }
});

module.exports = App;
