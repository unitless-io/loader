
# Unitless.io

JS developers tool for unit tests generation.\
Our goal is to save developers time to deliver more features without any quality loss.


## Features

- :movie_camera: **Capture live data** your functions operate during manual testing.
- :zap: **Generate unit-tests** based on the live data in a few clicks.
- :wrench: **Simple integration** so you can start in a few minutes.
- :duck: **Typescript support** out of the box.


## Installation


Install dev-dependency
```bash
  npm install --save-dev @unitless-io/loader
```

Add our plugin and loader to your webpack config
```javascript
  const { UnitlessPlugin } = require('@unitless-io/loader');

  module.exports = {
    ...,
    plugins: [new UnitlessPlugin()],
    ...,
    rules: [{
      test: /\.(js|ts)$/,
      use: [
        {
          loader: '@unitless-io/loader',
        },
      ]
    }],
  },
};
Note: make sure that the loader is added last to the rules array. Otherwise, you might experience unexpected behavior.
```
## Usage


Apply our special comment to your function
```javascript
// @unitless-io:test
export const sum = (a, b) => {
  ...
}
```

Run your application. Unitless web interface will be opened automatically in your browser.

![Home page of Unitless web interface](https://lh3.googleusercontent.com/drive-viewer/AJc5JmR2XGMuNLAtrKgd8K41x5Drol0PlzCTvVau0jvOkuDljbfQ3rnLOIXPOguq0dokCAaRFhLNoTp3AHBoVH0Tiqgfr0FU=w1920-h961)
Manually test your application, get back to the web interface and open function page.

![Function page of Unitless web interface](https://lh3.googleusercontent.com/drive-viewer/AJc5JmQ3ARAQxIA2WHolzTk1phbUnG4OYt1maQcJGHph-iMMTQvsIc-lzU5b5Zc9U58PnpqgaRP4XYX8xD0gDbIlXU4ukgAt9g=w2560-h1440)

Here you can view every function call, pick the ones you need and hit "download unit tests" button.\
You'll receive a unit tests file.

![Generated unit-tests file](https://lh3.googleusercontent.com/drive-viewer/AJc5JmR19kLJoOZVLAMzX0fM3icDA2xe6fVan4YKeLHzJMs_4Ii2LSSNhfdzb8XWL6rbxEpQMBFqxvrHHF5taYWZeJfKhIaw=w1920-h904)

That's it, enjoy!
## Limitations

For now Unitless supports only **arrow** functions.\
Also, function you want to test must be **exported** from the file.
## Where to get help

There are Telegram and WhatsApp communities available.\
You're welcome to ask any question there.

Telegram - https://t.me/unitless_discussion \
WhatsApp - https://chat.whatsapp.com/BUfSu2x6x5gIIYuuN8w3H1

If you would like to receive Unitless software updates, follow us on Twitter!\
Twitter - https://twitter.com/Unitless_io
## Authors

|Vlad Surahin|Siarhei Smantsar|
|----|----|
|![Vlad Surahin](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTzUMkbHCiUT0hj-brmCN9XSYlyZIz7ueyq_4pedQSBRs913tuzl6UbXTqbCQTp-hkHQLkSJRYaI3Swu0ZGVjFnvOzi=w1920-h961)|![Siarhei Smantsar](https://lh3.googleusercontent.com/drive-viewer/AJc5JmSgZ7ZbaYwGS2lazj7KXEuLy9seA7Z2zB4NEKmcikOQVHRbBM1gWv1Qo4RB7JB5OnUpMl3tg8hg7-cV0T0HtSJK22B4sA=w1279-h961)|
|[vinlaud](https://github.com/vinlaud)|[SIARHEI-SMANTSAR](https://github.com/SIARHEI-SMANTSAR)|

## License

Licensed under the [Apache License]((https://choosealicense.com/licenses/apache-2.0/)), Version 2.0.

