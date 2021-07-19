const chakram = require('chakram')
const expect = chakram.expect

describe('suggest', () => {
  it("madonna returns ray of light", async () => {
    const response = await chakram.get('http://localhost:3000/suggest/artists?prefix=madon')
    expect(response).to.have.status(500)
    await expect(response).to.comprise.of.json({
      "suggestions": [
        {
          "id": 8760,
          "name": "Madonna",
          "releases": [
            {
              "id": "14423",
              "title": "Ray Of Light",
              "notes": "The catalogue number on the spine is different from that on the label.\n\nSome copies have a sticker on front cover (applied on the shrinkwrap).\nMatte cover.\nTransparent inner sleeves."
            }
          ]
        }
      ]
    })
    return chakram.wait()
  })
  it("world tracks", async () => {
    const response = await chakram.get('http://localhost:3000/suggest/tracks?prefix=world')
    const worldTracks = { "suggestions": [{ "title": "Fourth World Destination", "duration": "11:12", "release": [{ "id": "630", "title": "Closed Circuit", "notes": "Packaged in a double jewel case with an illustrated 6-panel folded insert with credits and release information.\n\nRecorded and mixed at Western Works Studios, Sheffield.\nWritten 1994.\n\nCD1 is fully segued, CD2 only partially.\n\n℗ and © 1994 Beyond Records." }] }, { "title": "Velvet Blues III (The Off World Mix)", "duration": "5:28", "release": [{ "id": "688", "title": "Megasoft Office 2000", "notes": "\"The first volumes of the albums Megasoft office 97 et 98 were thought out and imagined for you office. Today, in this permanently moving universe, the static side of the \"office\" is gradually being outdated due to the technological advancements in permanent (r)evolution. The office seems to have dematerialized faster than the music... Music accompanies the peregrinations (the wanderings) of the 21st century \"workeller\" into the airports, trains, taxis, hotels and gardens. Computers, walkmen, telephones, cameras... numerise and transit sounds and music; the pleasure and emotion has become the added value in techology. Electronic sounds and emotions are mixed in these thirteen \"downtempo\" tracks of this new selection... listen or download... Bon voyage.\"\n\nFcom Team\n\nF 125 CD  137.0125.20  295PS  LS 01347\nCMV 5 0125 20 127 ACY  Made in Austria\n" }] }, { "title": "Material World", "duration": "5:17", "release": [{ "id": "717", "title": "Material World", "notes": "A samples [url=http://www.discogs.com/release/1559040]Marvin Gaye - Flyin' High (In The Friendly Sky)[/url].\nB samples [r833894].\n\nBPM: A: 145 | B: 128-130" }] }, { "title": "Rave New World", "duration": "5:29", "release": [{ "id": "787", "title": "X-101", "notes": "Licensed in 1991 from Underground Resistance | Detroit | USA by Tresor, a division of Interfisch Rec.\n\nThis issue got the UR logo printed on the front insert.\nThere also exist an  [url=http://www.discogs.com/release/1181201]issue[/url] with 'baby' logo printed on the front insert.\n" }] }, { "title": "World Domination", "duration": "6:46", "release": [{ "id": "884", "title": "The Fruity Green", "notes": null }] }] }
    expect(response).to.have.status(200)
    await expect(response).to.comprise.of.json(worldTracks)
    return chakram.wait()
  })
  it("dream releases", async () => {
    const dreamReleases = {"suggestions":[{"id":"239","title":"In My Dreams / Time Square","notes":null,"artist":[{"Id":310,"Name":"Decoder"}]},{"id":"269","title":"The Dreamer (Future Forces Remix) / Capture","notes":null,"artist":[{"Id":311,"Name":"Technical Itch"}]},{"id":"471","title":"Dreaming (Dahlbäck And Hulkkonen Remixes)","notes":null,"artist":[{"Id":50,"Name":"ADNY"}]},{"id":"722","title":"Dream Sequence","notes":"Recorded in Berlin, Nov. 1991.\nDistributed by EFA Distribution.\nRe-released in 2000 as [url=http://www.discogs.com/release/723]Tresor 149[/url] with additional tracks.\n","artist":[{"Id":1100,"Name":"Blake Baxter"}]},{"id":"864","title":"California Dreaming","notes":"Compilation of tracks by West Coast artists.","artist":[{"Id":194,"Name":"Various"}]}]}
    const response = await chakram.get('http://localhost:3000/suggest/releases?prefix=dream')
    expect(response).to.have.status(200)
    await expect(response).to.comprise.of.json(dreamReleases)
    return chakram.wait()
  })
  it("all zz should give us zzonked and zzino", async () => {
    const zz = {
      "artists": [
        {
          "id": 8871,
          "name": "Zzino vs. Filterheadz",
          "releases": [
            {
              "id": "16429",
              "title": "African Bulldozer / Sparadrap",
              "notes": "Recorded at Borderland Studio\nPublished by Headroom Music"
            }
          ]
        }
      ],
      "tracks": [
        {
          "title": "Zzonked",
          "duration": "7:21",
          "release": {
            "id": "4475",
            "title": "Intelligent Univers",
            "notes": null
          }
        },
        {
          "title": "ZZZzz9",
          "duration": "",
          "release": {
            "id": "6679",
            "title": "Machine Component 2",
            "notes": "Comes in a plastic zip-lock bag.\n\nLimited to 600.\n\nThe Machine components were all designed to be intermixable, thus from the components you could create your own machine. Each one is only discernable from the other by the hand written markings on the back of the sleeve.\n"
          }
        }
      ],
      "releases": []
    }
    const response = await chakram.get('http://localhost:3000/suggest/all?prefix=zz')
    expect(response).to.have.status(200)
    await expect(response).to.comprise.of.json(zz)
    return chakram.wait()
  })
})
