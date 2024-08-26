import { Elysia } from 'elysia'
import { faker } from '@faker-js/faker'

const whatsappRoute = new Elysia()

whatsappRoute.get('/bot-instances/organization', ({ set }) => {
  set.status = 200

  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    connectionStatus: 'open',
  }
})

whatsappRoute.get('/bot-instances/organization/connect', ({ set }) => {
  set.status = 200

  return {
    token:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVwAAAFcCAYAAACEFgYsAAAjE0lEQVR4AezBwY1kyw5kwdMXJQTlohQuEqVwuahFTy+5CiCQWff9maHZn7//sNZa69c9rLXWesXDWmutVzystdZ6xcNaa61XPKy11nrFw1prrVc8rLXWesXDWmutVzystdZ6xcNaa61XPKy11nrFD5ciize1xScii6ktbkQWU1vciCxO2uITkcXUFjciixtt8YnI4qQtpsjipC1uRBZTW0yRxdQWJ5HF1BZTZHHSFieRxUlbfCKyOGmLT0QWU1v8psjiTW1x42GttdYrHtZaa73iYa211it++FBbfFNkcRJZTG1xI7KY2uKkLabI4psii98UWfymyOKkLU7aYoosprY4iSymtpgii6ktTtrim9riE21xI7I4aYupLabIYoospraYIoupLaa2OIksPtEWJ23xTZHFJx7WWmu94mGttdYrHtZaa73ihy+LLG60xY22mCKLqS1O2uKb2mKKLE7a4kZkMbXFSWQxtcUUWUxtMUUWJ5HFSVvciCxOIouTtpgii2+KLKa2mNriJLL4RFt8oi3eFFlMbTFFFlNbTJHF1BZTZPGJyOJGW3zTw1prrVc8rLXWesXDWmutV/zw/5nI4qQtTtriE5HF1Bbf1BZTZDG1xTe1xRRZfKItTiKLk7Z4U2Rx0hZTZHHSFieRxdQWJ5HF1BY32mKKLD7RFlNk8f+Th7XWWq94WGut9YqHtdZar/jh/zGRxUlbTJHFSWQxtcWb2mKKLD4RWXyiLU7aYoosTtriJLKY2mKKLD7RFidtMUUWNyKLk7Y4iSxutMVJZHEjsjhpixuRxUlbnLTF/80e1lprveJhrbXWKx7WWmu94ocva4vfFFmctMUUWZy0xUlb3GiLG5HFJ9riRmQxtcUUWUxtMUUWU1tMkcXUFlNkMUUWU1tMbXHSFlNkMbXFSWRx0hYnbXEjsvhEW0yRxUlb3GiLKbKY2mKKLE7aYmqLG5HF1BafaIv/0sNaa61XPKy11nrFw1prrVf88KHI4r/UFlNkMbXFFFlMbTFFFlNbTJHF1BZTZDG1xRRZTG0xRRZTW0yRxUlkMbXF/7K2mCKLqS2myGJqixuRxdQWU2TxichiaosbkcXUFlNkMbXFFFncaIspspjaYoospraYIouTyGJqiymymNpiiiymtjiJLP6XPKy11nrFw1prrVc8rLXWesWfv//wf5HI4qQtTiKLqS2+KbI4aYsbkcVJW9yILE7aYoosprY4iSxO2uIksjhpi09EFt/UFjcii6ktbkQWJ21xEllMbXESWUxtMUUWN9piiiymtpgii6kt/m/2sNZa6xUPa621XvGw1lrrFT+8LLL4RFvciCxuRBYnbXGjLW5EFjcii0+0xUlbTJHFjbY4iSw+EVlMbXGjLabIYmqLKbKYIotviixutMUUWUxt8Ym2mCKLk7aYIospspjaYoosPhFZnLTFjchiaotPPKy11nrFw1prrVc8rLXWesWfv/9wIbKY2mKKLE7aYoosprY4iSymtpgii6ktpsjipC1OIotPtMUnIoupLabI4qQtpshiaospsjhpi5PIYmqLk8hiaouTyGJqiymymNpiiiymtjiJLKa2mCKLk7a4EVlMbfFNkcVJW0yRxdQW3xRZTG1xElmctMVJZPGJtrjxsNZa6xUPa621XvGw1lrrFT9caospspja4iSyOIkspraY2uITbXEjspja4iSymNriN0UWJ20xRRZTW0yRxdQWU2RxEllMbXESWZxEFr+pLU4iixttMUUWJ5HFjcjipC1utMUUWUyRxdQWJ5HF1BZvaouTyGJqi5PIYmqLTzystdZ6xcNaa61XPKy11nrFD5cii5PIYmqLG20xRRafiCxO2mKKLKa2OIksflNkcaMtbkQWU1t8oi1OIoupLabI4pva4iSymNpiaospsjiJLD7RFlNkcSOymNpiiiymtpjaYoosTiKLqS2myGJqi5O2mCKLk7b4TW3xTQ9rrbVe8bDWWusVD2uttV7xw6W2uBFZTG0xRRZTZHGjLabIYmqLKbI4aYspsrjRFlNkcdIW/6W2+ERkMbXFjchiaospspjaYoosvimymNriJLKY2mKKLE7a4pva4kZkcdIWU2TxTZHFSVtMkcUUWfymyOKkLW48rLXWesXDWmutVzystdZ6xQ+XIoupLU7a4kZbnEQW3xRZTG1x0hbfFFmctMUUWUxtMUUWJ21xI7L4RGQxtcVJZHESWUxt8Ym2mCKLk7Y4iSymtrgRWUxtMUUWU1vcaIspsjiJLE7a4qQtTtpiiixO2uIksjhpiymyuNEWn3hYa631ioe11lqveFhrrfWKHy61xRRZnLTFjchiaouTyOITbTFFFlNbTJHF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pshiaospspja4iSymNpiiiymtrgRWfymh7XWWq94WGut9YqHtdZar/jhUltMkcVJW3wispjaYmqLG5HF1BYnbfGbIouTtjhpixuRxUlb3IgsTtripC2myGJqiymymNripC2myOJNbXGjLabIYoospra40RZTZHESWdxoiymymCKLqS1OIotPRBZTW9xoiymy+MTDWmutVzystdZ6xcNaa61X/PAfiyxO2uIksvimtrgRWUxtcRJZnLTFjcjiRlvciCxO2mKKLKbI4qQtvqktflNkcRJZnLTFSWRx0hY32mKKLKa2mCKLk7aYIouTtjiJLKa2uBFZTG1xEllMbXESWUxt8YmHtdZar3hYa631ioe11lqv+OHL2mKKLG60xRRZ3GiLKbI4iSxutMWbIoupLW60xRRZnLTFSVuctMUUWUxtMUUWU1tMkcWNyGJqi5PI4qQtpraYIoupLU4ii6ktprY4iSxutMXUFlNkMbXFSWRx0hZTZPGJtvimtpgii6ktftPDWmutVzystdZ6xcNaa61X/PChtpgii6ktpshiaospsvhNbfFNbXGjLabIYoosTiKLk7aYIotPtMWNyOJGW5y0xRRZnLTFSVucRBYnkcUn2uIksvhEW5xEFlNbTJHF1Bbf1BY3IouTtjiJLKa2uBFZTG3xiYe11lqveFhrrfWKh7XWWq/44UORxUlkMbXFFFlMbTFFFlNbTJHFjcjipC2myGJqiymymNriE20xRRZTW7wpsjhpi98UWUxtcRJZnLTFFFlMbTFFFlNbTJHFFFlMbXGjLabI4qQtTiKLqS2myGJqi5O2+ERkMbXFFFlMbXESWZy0xRRZTG1x0hZTZDG1xY2HtdZar3hYa631ioe11lqv+PP3Hy5EFlNb3IgspraYIouTtjiJLKa2OIkspraYIouTtvimyGJqi98UWdxoixuRxUlbfCKymNpiiiymtpgii6ktpshiaotPRBY32uIkspjaYoosTtpiiiymtrgRWXyiLabI4k1tMUUWU1t84mGttdYrHtZaa73iYa211iv+/P2HC5HFSVtMkcWNtnhTZHHSFlNkcdIWU2QxtcUnIosbbTFFFlNb3IgsPtEWJ5HFSVtMkcXUFieRxdQWNyKLk7aYIosbbTFFFjfa4jdFFidtMUUWU1ucRBZTW5xEFlNbTJHFSVu86WGttdYrHtZaa73iYa211it++LLIYmqLKbKY2mKKLKa2OIkspraYIotPRBZTW9xoi29qi/+XtcUUWUyRxSfa4iSyuNEWU2QxtcUUWUxtMUUWJ20xRRZTZDG1xRRZnLTFjbb4RGRxElmctMUUWZy0xY3I4qQtbjystdZ6xcNaa61XPKy11nrFn7//8EWRxUlb3Igs3tQWNyKLk7Y4iSymtjiJLE7a4iSyOGmLKbL4praYIoupLabIYmqLKbL4TW1xElmctMWNyGJqi98UWdxoi5PI4kZb3IgsTtriE5HF1BZTZDG1xY2HtdZar3hYa631ioe11lqv+PP3Hz4QWXyiLabIYmqLG5HFjbb4RGQxtcUUWUxtcRJZTG3xichiaouTyGJqiymymNriE5HFSVucRBbf1BYnkcUn2uITkcXUFieRxdQWJ5HFSVvciCxO2mKKLE7a4jdFFidt8YmHtdZar3hYa631ioe11lqv+PP3H35RZHGjLb4psvimtjiJLE7aYoosbrTFFFlMbTFFFidtMUUWJ20xRRZTW0yRxdQWn4gsTtpiiiymtpgii5O2mCKLqS1OIouTtpgii5O2mCKLk7aYIoupLX5TZDG1xTdFFlNbnEQWU1ucRBZTW3ziYa211ise1lprveJhrbXWK/78/YcLkcX/krb4pshiaov/JZHFb2qLk8hiaospspja4iSymNpiiixO2uJGZHHSFieRxW9qiymy+ERbTJHFSVucRBYnbTFFFidtMUUWU1tMkcU3tcWNyGJqixsPa621XvGw1lrrFQ9rrbVe8cOltjiJLG60xY3IYoosbrTFFFlMbTFFFt/UFlNk8Ym2uBFZ/Ka2OIkspraYIoupLW5EFlNbnLTFFFncaIsbkcVJZHGjLd7UFp9oi29qixuRxUlkMbXFNz2stdZ6xcNaa61XPKy11nrFD5cii6ktpraYIosbkcXUFr+pLX5TW9xoi5PI4iSymNriN0UWJ20xtcUUWZxEFlNb3IgspraYIoupLabI4kZkMbXFJ9piiixOIoupLaa2mCKLKbKY2uIksrgRWUxtcRJZ3Igsprb4RGQxtcUnHtZaa73iYa211ise1lprveKHS23xm9rim9riJLK40RYnkcUUWUxtcRJZfKItPhFZTG3xprZ4U1tMkcXUFlNkcdIWn2iLKbKY2uKkLabI4hORxdQWU1ucRBZTW/ymtvhEW/ymh7XWWq94WGut9YqHtdZar/jz9x8uRBZTW0yRxdQWU2TxTW0xRRY32uITkcXUFieRxdQWU2QxtcUUWXxTW0yRxUlbnEQWn2iLKbKY2mKKLKa2+E2RxTe1xUlkMbXFJyKLqS2myGJqiymy+ERb3IgsflNbnEQWU1t84mGttdYrHtZaa73iYa211iv+/P2HXxRZnLTFN0UWU1tMkcXUFjcii6ktbkQWU1tMkcXUFlNkMbXFFFlMbXEjsvhEW0yRxdQWU2TxprY4iSxO2mKKLKa2OIksvqktTiKLb2qLG5HFSVtMkcUn2mKKLKa2mCKLk7aYIoupLW48rLXWesXDWmutVzystdZ6xQ+XIouTtrgRWZy0xRRZnLTFSVucRBZTW9yILE7aYoosbrTFFFmcRBZTW0yRxUlb3Igs3tQWn4gspraYIouTtpgii6ktpraYIouTtpgii29qiymymNpiiiymtvgvtcUUWdxoi5PIYmqLTzystdZ6xcNaa61XPKy11nrFn7//8KLI4qQtPhFZfKItTiKLk7Y4iSymtpgii0+0xRRZnLTFjchiaospsjhpiymymNriJLKY2uJGZHHSFlNk8Ym2mCKL39QWNyKLqS1uRBY32mKKLKa2uBFZTG0xRRYnbXESWZy0xY2HtdZar3hYa631ioe11lqv+OGXRRZTW0yRxRRZTG0xRRZTW5y0xScii5O2OIksTiKLqS2myOKkLabI4qQtpsjiN7XFSVtMkcXUFlNbTJHFSVvciCxO2mKKLKa2eFNbTJHF1Ba/qS1OIouTtpgii6ktTtpiiixuRBY32uITD2uttV7xsNZa6xUPa621XvHDpchiaouTtpgii5O2mCKLG20xRRbf1BZvaouTyGJqiymymCKLk7Y4iSw+EVmctMVJZPFNbfGJtpgii5O2mCKLb2qLKbKY2uITkcXUFjcii6ktTiKLqS1O2mKKLKa2+ERkMbXFjYe11lqveFhrrfWKh7XWWq/44csii6ktbkQWNyKLqS1utMWNyOJGW0yRxdQWU2QxtcUUWUxtMUUWU1ucRBY32uKkLabI4qQtpsjipC1OIouTtpgii6ktbkQWJ20xRRZTW0yRxScii5PI4iSyuBFZnLTFjbaYIospspja4psii5O2+MTDWmutVzystdZ6xcNaa61X/PChyGJqi0+0xRRZTG0xRRafiCymtpgii6ktpshiaouTtjhpiymymNpiiixuRBZTW5xEFlNbTJHF1BYnbXGjLU4ii6ktbrTFFFlMbTFFFlNbnEQWU1vcaIspspgii6ktTiKLqS2myOKkLT4RWUxtcdIWNyKLqS2myOKkLabI4pse1lprveJhrbXWKx7WWmu94s/ff7gQWUxtcRJZTG1xElmctMUnIoupLabI4qQtflNkMbXFFFncaIsbkcXUFlNkcdIWvymy+F/SFieRxUlbnEQWJ23xicjipC2myGJqiymy+E1tcRJZTG0xRRYnbfGbHtZaa73iYa211ise1lprveKHD0UWU1tMbTFFFlNbTG0xRRYnkcVJW5xEFidtcRJZnLTFSWTxTW3xpraYIouTtvimtpgii6ktpshiaospspjaYoospsjiRltMkcXUFlNbTJHFSWRx0hYnbTFFFp9oi5PIYmqLG5HF1BZTZDG1xX/pYa211ise1lprveJhrbXWK/78/YcviixO2uIksjhpi5PI4qQtpsjipC2myGJqi2+KLG60xUlkMbXFFFncaIspsjhpi5PIYmqLG5HF1BYnkcVJW3xTZDG1xRRZTG1xElmctMUUWUxt8U2RxUlbnEQWU1tMkcXUFm+KLKa2+MTDWmutVzystdZ6xcNaa61X/HApspja4qQtpsjipC0+0RYnkcXUFieRxdQWU2QxtcUUWXyiLU4ii6ktpraYIoupLd4UWUxtMUUWU1vciCxO2mKKLKbI4qQtpshiaotPRBY32uJGZDG1xRRZTG0xRRYnbTFFFidtMUUWNyKLqS1OIouTtvhND2uttV7xsNZa6xUPa621XvHDhyKLG20xRRZTZHHSFieRxdQWNyKLqS1O2mKKLKa2+ERkcSOy+C+1xRRZTG1xI7I4aYsbkcUnIouTyOIksvimyGJqi6ktpsjiE23xTZHF1BZTZDFFFlNbTJHF1BbfFFlMbXHjYa211ise1lprveJhrbXWK/78/YcPRBafaIuTyGJqiymymNpiiix+U1ucRBZTW9yILG60xScii0+0xScii6ktbkQWN9piiixutMUUWUxtMUUWU1tMkcXUFlNkMbXFFFl8oi2myGJqi5PI4qQtTiKLk7aYIosbbTFFFlNbTJHF1BafeFhrrfWKh7XWWq94WGut9YofLkUWJ21xElmcRBa/qS2myOJGW/wviyymtvhEW0yRxdQW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',
  }
})

whatsappRoute.patch('/customers/send-pending-message', ({ set }) => {
  set.status = 200
})

export { whatsappRoute }
