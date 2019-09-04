window.onload = () => {
  const input = document.getElementById("input"),
    btn_search = document.getElementById("search"),
    song_list = document.getElementById("song_list"),
    music_src = document.getElementById("source_m"),
    song_info = document.getElementById("song_info");

  var p0 = document.createElement("p");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");

  var key_search, SONG_LIST, SONG_INFO;
  input.onchange = e => {
    console.log(e);
    console.log(e.target.value);
    key_search = e.target.value;
  };
  btn_search.onclick = e => {
    console.log(e);
    fetch(
      `https://v1.itooi.cn/netease/search?keyword=${key_search}&type=song&pageSize=20&page=0`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        SONG_LIST = res.data.songs;
        console.log(SONG_LIST);
        Add_item();
      });
  };

  let Add_item = () => {
    try {
      let list2remove = document.getElementsByClassName(`song_list`);
      console.log(list2remove);
      for (let i = 0; i < list2remove.length; i++) {
        song_list.removeChild(list2remove[i]);
      }
    } catch (e) {
      console.warn(e);
    }
    for (let i = 0; i < SONG_LIST.length; i++) {
      let list_item = document.createElement("li");

      list_item.className = `song_list`;

      list_item.innerHTML = `<a>${SONG_LIST[i].name}</a>`;

      list_item.id = SONG_LIST[i].id;

      list_item.onclick = () => {
        fetch(`https://v1.itooi.cn/netease/song?id=${SONG_LIST[i].id}`)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            SONG_INFO = res.data.songs[0];

            Add_info();

            music_src.src = `https://v1.itooi.cn/netease/url?id=${
              SONG_LIST[i].id
            }&quality=320`;
          });
      };
      console.log(list_item);

      song_list.appendChild(list_item);
    }
  };

  let Add_info = () => {
    p0.innerHTML = `Name ` + SONG_INFO.name;
    song_info.appendChild(p0);
    p1.innerHTML = `ID ` + SONG_INFO.id;
    song_info.appendChild(p1);
    p2.innerHTML = `copyright ` + SONG_INFO.copyright;
    song_info.appendChild(p2);
  };
};
//Billie Eilish
