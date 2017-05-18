asynctest(
  'Browser Test: events.BroadcastingEventsTest',

  [
    'ephox.agar.api.Step',
    'ephox.agar.api.Waiter',
    'ephox.alloy.api.component.GuiFactory',
    'ephox.alloy.api.events.SystemEvents',
    'ephox.alloy.api.ui.Container',
    'ephox.alloy.construct.EventHandler',
    'ephox.alloy.test.GuiSetup',
    'ephox.boulder.api.Objects',
    'global!window'
  ],

  function (Step, Waiter, GuiFactory, SystemEvents, Container, EventHandler, GuiSetup, Objects, window) {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];

    var bodyMargin = [
      'body { margin-top: 2000px; }'
    ];

    GuiSetup.setup(function (store, doc, body) {
      return GuiFactory.build(
        Container.sketch({
          dom: {
            styles: {
              'overflow-x': 'hidden',
              background: 'blue',
              'max-width': '300px',
              height: '20px'
            }
          },
          events: Objects.wrap(
            SystemEvents.windowScroll(),
            EventHandler.nu({
              run: function (component, simulatedEvent) {
                store.adder(simulatedEvent.event().raw().type)();
              }
            })
          )
        })
      );

    }, function (doc, body, gui, component, store) {
      return [
        GuiSetup.mAddStyles(doc, bodyMargin),
        Step.sync(function () {
          window.scrollTo(0, 100);
        }),
        Waiter.sTryUntil(
          'Checking for scrolling message',
          store.sAssertEq('Should have scrolled', [ 'scroll' ]),
          100,
          1000
        ),
        GuiSetup.mRemoveStyles
      ];
    }, function () { success(); }, failure);
  }
);