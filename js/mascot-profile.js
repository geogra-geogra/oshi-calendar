// Fetch mascot data
fetch("../data/mascot.json?20230912")
    .then(response => response.json())
    .then(mascotData => {
        let item = mascotData.find(m => m.name === filename);
        if (item) {
            let html = `
        <h2>プロフィール</h2>
        ${item.team ? `${item.full}は、${item.team}のマスコット。` : ''}
        ${item.debut ? `${item.debut}年に登場。` : ''}
        ${item.no ? `背番号は${item.no}。` : ''}
        <br><a href="${item.url}" target="_blank" rel="noopneer noreferrer">公式プロフィール</a><br>
        ${item.blog ? `<a href="${item.blog}"target="_blank" rel="noopener noreferrer">公式ブログ</a><br>` : ''}
        ${item.schedule ? `<a href="${item.schedule}"target="_blank" rel="noopener noreferrer">公式スケジュール</a><br>` : ''}
        ${item.Twitter ? `<a href="${item.Twitter}"target="_blank" rel="noopener noreferrer">Twitter</a><br>` : ''}
        ${item.Instagram ? `<a href="${item.Instagram}"target="_blank" rel="noopener noreferrer">Instagram</a><br>` : ''}
        <img class="mascot-img" src="../img/${item.name}.jpg" alt="" onError="this.onerror=null; this.src='../img/default.jpg';">
        <!--自由記述--!>
      `;
            // Append html to the content div
            document.getElementById('mascot-profile').innerHTML = html;

        }
    });
