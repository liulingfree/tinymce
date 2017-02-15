define(
  'ephox.alloy.api.behaviour.Keying',

  [
    'ephox.alloy.api.behaviour.Behaviour',
    'ephox.alloy.behaviour.keyboard.KeyboardBranches',
    'ephox.boulder.api.Objects',
    'global!console'
  ],

  function (Behaviour, KeyboardBranches, Objects, console) {
    // These APIs are going to be interesting because they are not
    // available for all keying modes
    return Behaviour.createModes(
      'mode',
      KeyboardBranches,
      'keying',
      {
        events: function (keyInfo) {
          var handler = keyInfo.handler();
          return handler.toEvents(keyInfo);
        }
      },
      {
        focusIn: function (component, keyInfo) {
          component.getSystem().triggerFocus(component.element(), component.element());
        },

        // These APIs are going to be interesting because they are not
        // available for all keying modes
        setGridSize: function (component, keyInfo, numRows, numColumns) {
          if (! Objects.hasKey(keyInfo, 'setGridSize')) {
            console.error('Layout does not support setGridSize');
          } else {
            keyInfo.setGridSize()(keyInfo, numRows, numColumns);
          }
        }
      },
      { }
    );
  }
);