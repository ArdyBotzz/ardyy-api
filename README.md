<center><img src="https://i.pinimg.com/736x/20/69/d7/2069d7b3ed600771bf9df3d5f3fbdbb5.jpg" alt="gojo" width="500"></img>
</p></center>

## Install
```bash
> $ npm i ardyy-api
```

## ```Downloader```
```js
const ar = require("ardyy-api") // you can replace it with anything

// example

// tiktok
ar.TiktokDownloader("https://vt.tiktok.com/ZSehTWVEU/")
.then((res) => console.log(res))

or

data = await ar.TiktokDownloader("https://vt.tiktok.com/ZSehTWVEU/")
console.log(data)

output

{
  creator: 'A͓r͛d͒y͢',
  status: 200,
  result: {
    username: '._sadstrong',
    nickname: 'Nightbot',
    description: '#zachking #trending #xyzbca #fy',
    views: 7400000,
    likes: 182400,
    comments: 358,
    shares: 515,
    link: {
      thumbnail: 'https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/bd2970ba17a94f3bad4191a3ee2675bb?x-expires=1637064000&x-signature=sh0h3eQxa8OVBHno5az10aXD0Vs%3D',
      nowatermark: 'https://ttdownloader.com/dl.php?v=YTo0OntzOjk6IndhdGVybWFyayI7YjowO3M6NzoidmlkZW9JZCI7czozMjoiY2Y0YmJmMGNjMGQ1Nzg4ZWNkZDMyODIzMjViYjQ3OTciO3M6MzoidWlkIjtzOjMyOiI3M2I2OGEzOTA5NzYxODlkNjdhOWI3MWU4YTgwYTBkZSI7czo0OiJ0aW1lIjtpOjE2MzcwNDI3OTY7fQ==',
      watermark: 'https://ttdownloader.com/dl.php?v=YTo0OntzOjk6IndhdGVybWFyayI7YjoxO3M6NzoidmlkZW9JZCI7czozMjoiY2Y0YmJmMGNjMGQ1Nzg4ZWNkZDMyODIzMjViYjQ3OTciO3M6MzoidWlkIjtzOjMyOiI3M2I2OGEzOTA5NzYxODlkNjdhOWI3MWU4YTgwYTBkZSI7czo0OiJ0aW1lIjtpOjE2MzcwNDI3OTY7fQ==',
      audio: 'https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/7027642335114726171.mp3'
    }
  }
}
```


## ```Shearching```
```js
const ar = require("ardyy-api") // you can replace it with anything

// example

// play store
ar.playStore("epep")
.then((res) => console.log(res))

or

data = await ar.playStore("epep")
console.log(data)

output

{
  creator: 'A͓r͛d͒y͢',
  status: 200,
  result: [
    {
      name: 'Garena Free Fire - Booyah Day',
      link: 'https://play.google.com/store/apps/details?id=com.dts.freefireth',
      developer: 'Garena International I'
    },
    {
      name: 'Garena Free Fire MAX',
      link: 'https://play.google.com/store/apps/details?id=com.dts.freefiremax',
      developer: 'Garena International I'
    }
  ]
}

// sticker shearch
ar.stickerShearch("patrick").then((res) => console.log(res))

// wallpaper
ar.wallpaperShearch("nasa").then((res) => console.log(res))

// pinterest
ar.pinterest("gura").then((res) => console.log(res))

```