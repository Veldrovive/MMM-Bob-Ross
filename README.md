# MMM-Bob-Ross
![Demo1](https://i.imgur.com/gIFZl54.gif)<br/>
Why not put a happy little cabin on your happy little [MagicMirror²](https://github.com/MichMich/MagicMirror)?
Bob Ross is the quintessential wholesome TV guy, so I thought it was time for him to make his debut on the silver screen... or reflective screen I guess. <br/><br/>
Displays a random Bob Ross painting when started, but can also play the episode where he paints it.
To display the video, another module must send a notification with ``ROSS_PLAY_VIDEO`` and to switch back they must send ``ROSS_SHOW_IMAGE``. More information on all notifications below.

## Installation
Navigate to the modules folder of your Magic Mirror installation.
```bash
cd ~/MagicMirror/modules
```

Clone the repository.
```bash
git clone https://github.com/Veldrovive/MMM-Bob-Ross.git
```

## Usage
```js
  modules: [
    ...
    {
      module: "MMM-Bob-Ross",
      position: "bottom_left",
      config: {
        imgHeight: "30vh", //Or any valid css height measure. Defines the height of the painting.
        videoHeight: "30vh", //Same as above. Defines the height of the video
        updateInterval: 1*60*60*1000, //How often does the painting change?
        autoPlay: true //Should the video start as soon as it switches or does it need the play command?
      }
    }
    ...
  ]
```

## Configuration

Option|Description
------|-----------
`imgHeight`|Define the height of the module when in display picture mode. <br/>**Expected Value Type:** `String (Valid css value)`
`videoHeight`|Define the height of the module when in display video mode. <br/>**Expected Value Type:** `String (Valid css value)`
`updateInterval`|Define the interval of time between updates of the painting (0 for never switch). <br/> **Expected Value Type:** `Integer`
`autoPlay`|Define whether the video should start as soon as it appears. <br/> **Expected Value Type:** `Boolean`

## Integration with other modules
Control of MMM-Bob-Ross through the notification system:

Notification|Description
------------|-----------
`ROSS_PLAY_VIDEO`|Switch to the video mode. <br/>**Expected Payload:** `none`
`ROSS_SHOW_IMAGE`|Switch to painting display mode. <br/>**Expected Payload:** `none`
`ROSS_PAUSE_VIDEO`|Pause the video when in video mode. <br/>**Expected Payload:** `none`
`ROSS_UNPAUSE_VIDEO`|Unpause the video when in video mode. <br/>**Expected Payload:** `none`
`ROSS_NEW_IMAGE`|Forces a painting change. <br/>**Expected Payload:** `none (random painting) - integer (pick out of array) - Object ({season: number, episode: number})`
