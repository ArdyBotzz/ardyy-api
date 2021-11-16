const axios = require('axios');
const cheerio = require('cheerio');
const creator = "A͓r͛d͒y͢"

const tiktokdownload = async (Url) => {
  return new Promise (async (resolve, reject) => {
    let get_data = await axios.get(Url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Cookie': 'tt_webid_v2=6986233640163411458; tt_webid=6986233640163411458; MONITOR_WEB_ID=6986233640163411458; passport_csrf_token_default=6c4582eb39e3a918b79bf19883e0383a; passport_csrf_token=6c4582eb39e3a918b79bf19883e0383a; passport_auth_status=b129aac2144e7d181e9206c77b829f33%2C; passport_auth_status_ss=b129aac2144e7d181e9206c77b829f33%2C; sid_guard=59bce8b9c36fd2ae7c65dc9ed1e57f4b%7C1626609635%7C5184000%7CThu%2C+16-Sep-2021+12%3A00%3A35+GMT; uid_tt=10f21da80e938dc4c74ac772a612ac900db73a510dce996f1e87038ed113d3b0; uid_tt_ss=10f21da80e938dc4c74ac772a612ac900db73a510dce996f1e87038ed113d3b0; sid_tt=59bce8b9c36fd2ae7c65dc9ed1e57f4b; sessionid=59bce8b9c36fd2ae7c65dc9ed1e57f4b; sessionid_ss=59bce8b9c36fd2ae7c65dc9ed1e57f4b; store-idc=alisg; store-country-code=id; tt_csrf_token=K1up8j9z7OmTrSfmvmoO1JP2; R6kq3TV7=AF7-iQB7AQAAqk-Wy_M1HqFLRc1VQ_I-5EkI1mYmYzKL9Nb5BnYDd5zx0dym|1|0|c5260d1687443f9982544406597db77fb23ffc52; s_v_web_id=verify_krsv2o62_iDlMefgy_hytF_4I87_9jYh_Ujpnwxam1TNO; cmpl_token=AgQQAPOgF-RMpbDNIuufsZ04-pWPSIhMP4ArYP5gWA; odin_tt=04cf5d9f07b62e050c679ab203370816484a861d3efc80bd5d0db6fd4b0c4a6018acdd2d4b2b814e487f25ba678a53103e29abb336446c456ee9dfff04a0a789bdc6b29b4685b81aa50161179b68c98b; ttwid=1%7C5hEmJiL5W2c3q3WVqHbF85173NjIdJm9ZJJPEvxQeyI%7C1627801693%7C48ff7670e842ddd8b838a35541a94891eb144539cba2b0cb308b20254e6fe089; passport_fe_beating_status=false'
        }
    })

    //Getting the element
    let $ = require('cheerio').load(get_data.data)
    let jsnya = JSON.parse($('script').eq(6).get()[0].children[0].data)
    let t = jsnya.props.pageProps.itemInfo.itemStruct

	  await axios.request({
	    url: "https://ttdownloader.com/",
	    method: "GET",
	    headers: {
	      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	    	"accept-language": "en-US,en;q=0.9,id;q=0.8",
	    	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
	    	"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
	    }
	  }).then( respon => {
	    const $ = cheerio.load(respon.data)
	    const token = $('#token').attr('value')
	    axios({
	      url: "https://ttdownloader.com/req/",
		    method: "POST",
	    	data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
		    headers: {
		      "accept": "*/*",
		      "accept-language": "en-US,en;q=0.9,id;q=0.8",
		      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
		      "cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
		    }
	  }).then( res => {
	    const ch = cheerio.load(res.data)
		  const result = {
		    creator: creator,
		    status: res.status,
		    result: {
		    username: t.author.uniqueId,
		    nickname: t.author.nickname,
        description: t.desc,
        views: t.stats.playCount,
        likes: t.stats.diggCount,
        comments: t.stats.commentCount,
        shares: t.stats.shareCount,
        link: {
          thumbnail: t.video.cover,
			    nowatermark: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),
			    watermark: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
			    audio: t.music.playUrl
		      }
		   }
		}
		resolve(result)
	}).catch(reject)
	}).catch(reject)
  })
}

const shearchstick = (queryy) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://getstickerpack.com/stickers?query=${queryy}`)
    .then(({data}) => {
      const $ = cheerio.load(data)
      const source = []
      const linknya = []
      $('#stickerPacks > div > div:nth-child(3) > div > a').each((a, b) => {
        source.push($(b).attr('href'))
      })
      axios.get(source[Math.floor(Math.random() * source.length)])
      .then(({data}) => {
        const $2 = cheerio.load(data)
        $2('#stickerPack > div > div.row > div > img').each((c, d) => {
          linknya.push($2(d).attr('src').replace(/&d=200x200/g, ''))
        })
        result = {
          creator: creator,
          status: 200,
          result: {
            title: $2('#intro > div > div > h1').text(),
            stickerUrl: linknya
          }
        }
        resolve(result)
      })
    }).catch(reject)
  })
}

const pinterest = (queryy) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://id.pinterest.com/search/pins/?autologin=true&q=${queryy}`, {
      headers: {
        cookie: "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
      }
    }).then(({data}) => {
      const $ = cheerio.load(data)
      const result = []
      const hasil = []
      $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
        result.push(link)
      })
      result.forEach(function (v) {
        if (v == undefined) return
        hasil.push(v.replace(/236/g,'736'))
      })
      hasil.shift()
      result2 = {
        creator: creator,
        status: 200,
        result: hasil
      }
      resolve(result2)
    }).catch(reject)
  })
}

const playstore = (queryy) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://play.google.com/store/search?q=${queryy}&c=apps`)
    .then(({data}) => {
      const $ = cheerio.load(data)
      let ln = []
	    let nm = []
	    let dv = []
	    let lm = []
	    const result = []
	    $('div.wXUyZd > a').each((a, b) => {
	      const limk = 'https://play.google.com'+$(b).attr('href')
	      ln.push(limk)
	    })
	    $("div.b8cIId.ReQCgd.Q9MA7b > a > div").each((c, d) => {
	      const name = $(d).text().trim()
	      nm.push(name)
	    })
	    $("div.b8cIId.ReQCgd.KoLSrc > a > div").each((e, f) => {
	      const dev = $(f).text().trim()
	      dv.push(dev)
	    })
	    for (let i = 0; i < ln.length; i++) {
	      result.push({
	        name: nm[i],
	        link: ln[i],
	        developer: dv[i]
	      })
	    }
	    hasil = {
	      creator,
	      status: 200,
	      result
	    }
	    resolve(hasil)
    })
  })
}

const wallpaper = (queryy) => {
  return new Promise ((resolve, reject) => {
    axios.get("https://www.wallpaperflare.com/search?wallpaper="+queryy)
    .then(({data}) => {
      const $ = cheerio.load(data)
      const hasil = []
      $("#gallery > li > figure> a").each((a, b) => {
        const img = $(b).find('img').attr('data-src')
        hasil.push(img)
      })
      result = {
        creator,
        status: 200,
        result: hasil
      }
      resolve(result)
    }).catch(reject)
  })
}

module.exports.TiktokDownloader = tiktokdownload
module.exports.stickerShearch = shearchstick
module.exports.pinterest = pinterest
module.exports.playStore = playstore
module.exports.wallpaperShearch = wallpaper