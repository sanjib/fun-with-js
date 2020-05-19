$(document).ready(function(){

	// 1. init scroll magic
    var controller = new ScrollMagic.Controller();

    // pin the intro
    var pinIntroScene = new ScrollMagic.Scene({
        triggerElement: '#intro',
        triggerHook: 0,
        duration: '30%'
    }).setPin('#intro', {pushFollowers: false})
      .addTo(controller);

    var pinIntroScene2 = new ScrollMagic.Scene({
        triggerElement: '#project01',
        triggerHook: 0,
        duration: 0.4
    }).setPin('#intro', {pushFollowers: false})
        .addTo(controller);

    // loop through each .project element
    $('.project').each(function () {
        // 2. build scene
        var ourScene = new ScrollMagic.Scene({
            triggerElement: this.children[0],
            // duration: 300, // 300 pixels
            // duration: '90%', // responsive, 100% of view port height
            triggerHook: 0.9,
            // reverse: false
        }).setClassToggle(this, 'fade-in') // add class to project01
          .addIndicators({
              name: 'fade scene',
              colorTrigger: 'black',
              // indent: 200,
              colorStart: 'lightgreen',
              colorEnd: 'pink'
          }) // requires debug.addIndicators.min.js plugin
          .addTo(controller);
    });

});


















