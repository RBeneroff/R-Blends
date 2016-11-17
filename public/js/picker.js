// (function () {
//   var app = {
//     start: function() {
//       this.output = $('#output');
//       this.result = $('#result');
//       // this.result2 = $('#result2');
//       var self    = this,
//         initialColor = this.result.css('background');
//         // initialColor = this.result2.css('background');
//       var colorPicker = $('#color_one, #color_two').spectrum({
//         chooseText: 'ok',
//         color:      initialColor,
//         move:       function(col) { self.onMove(col.toHexString()); },
//         change:     function(col) { self.onChange(col.toHexString()); },
//         hide:       function(col) { self.onHide(col.toHexString()); }
//       });
//       this.broadcast(colorPicker.spectrum('get').toHexString());
//     },
//
//     onMove: function(color) {
//       this.result.css('background', color);
//     },
//
//     onChange: function(color) {
//       this.result.css('background', color);
//       this.broadcast(color);
//     },
//
//     onHide: function(color) {
//       this.result.css('background', color);
//       this.broadcast(color);
//     },
//
//     broadcast: function(color) {
//       this.output.html('Final color: ' + color);
//     }
//   };
//
//   $(function () {
//     app.start();
//   });
// })();
