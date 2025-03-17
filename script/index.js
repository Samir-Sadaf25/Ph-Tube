
function loadCatagory() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCatagoris(data.categories))
}
// https://openapi.programming-hero.com/api/phero-tube/category/1003
const loadCatagoryVideos = (id) =>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActiveClass()
    const clickedButton = document.getElementById(`btn-${id}`)
    clickedButton.classList.add("active")
    
    displayVideos(data.category)
  })
  
}
function removeActiveClass()
{
   const activeButtons = document.getElementsByClassName("active")
   for(let btn of activeButtons)
   {
      btn.classList.remove("active")
   }
}
function displayCatagoris(catagories) {
    const catagoryContainer = document.getElementById('catagory-container');
    for (cat of catagories) {
        
      const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
     <button id = "btn-${cat.category_id}" onclick = "loadCatagoryVideos(${cat.category_id})"  class="btn hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
        catagoryContainer.appendChild(catagoryDiv)
    }
}


// {
//     "category_id": "1003",
//     "video_id": "aaaj",
//     "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
//     "title": "Kid Gorgeous",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
//             "profile_name": "John Mulaney",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "241K",
//         "posted_date": ""
//     },
//     "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."
// }

function loadVideoDetails(video_id)
{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      displayDetails(data.video)
    })
}
const displayDetails = (video_id) =>{
  //const detailsContainer = document.getElementById("details-Container")
  document.getElementById("video_Details").showModal()
  const detailsDiv = document.getElementById("detailsDiv");
  console.log(detailsDiv);
  
  detailsDiv.innerHTML = `
     <h1>${video_id.title} </h1>
  `

}
function loadVideos(input ="") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`)
        .then(res => res.json())
        .then(data => {
          removeActiveClass()
          document.getElementById("btn-all").classList.add("active")
          displayVideos(data.videos)
        })
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML =""
    if(videos.length == 0)
    {
       videoContainer.innerHTML = `
       <div class="col-span-full justify-self-center py-5">
        <img class="place-self-center" src="./assets/Icon.png" alt="">   
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
       </div>
       `
    }
    videos.forEach(video => {
      
      
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
       <div class="card bg-base-100 ">
            <figure class="relative">
              <img class="w-full h-[200px]"
                src="${video.thumbnail}"
                alt="video" />
                <p class="text-sm absolute text-white bottom-2 right-2 bg-black p-1 rounded-lg">3hrs 56 min ago</p>
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <div >
                <div class="avatar">
                    <div class="w-10 rounded-full px-0">
                      <img src=" ${video.authors[0].profile_picture} " />
                    </div>
                  </div>
              </div>
              <div>
                <h2 class="card-title font-semibold">Building a Winning UX Strategy Using the Kano Model</h2>
                <p class="flex text-gray-400 text-sm"> ${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="">` : ``} </p>
                <p class="text-gray-400 text-sm">${video.others.views}</p>
              </div>
              
            </div>
            <button onclick = "loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
          </div>
          
       `
    videoContainer.appendChild(videoDiv)   
    })
}

document.getElementById("search-input").addEventListener('keyup',(event) =>{
   const input = event.target.value
    loadVideos(input)
})

loadCatagory()
