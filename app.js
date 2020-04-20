const txtBox = document.querySelector('input');
const submitBtn = document.querySelector('.add__btn');
// const listElement = document.querySelector('.rep-list');
const postTemplate = document.getElementById('single-post');
const postList = document.querySelector('.rep-list');
const name = document.querySelector('.nametxt');
const bio = document.querySelector('.biotxt');


const publicRepos =  document.querySelector('.pubrepos');
const hireable = document.querySelector('.hireable');


function sendHttpRequest(method, url) {
    return fetch(url).then(response => {
        return response.json();
    });

}

async function fetchPosts(user) {
    const responseData = await sendHttpRequest(
        'GET',
        `https://api.github.com/users/${user}`    
    );
    // console.log(responseData);
    name.textContent = `Name: ${responseData.login}`;
    bio.textContent = `Bio: ${responseData.bio}`;
    publicRepos.textContent = `Number of Public Repositories = ${responseData.public_repos}`;
    if(responseData.hireable === true) {
        hireable.textContent = `${responseData.login} is Hireable.`;
    } else {
        hireable.textContent = `${responseData.login} is not Hireable`;
    }

    const responsereposData = await sendHttpRequest(
        'GET',
        `https://api.github.com/users/${user}/repos`
    );
    console.log(responsereposData);
    const listOfReps = responsereposData;
    for(const list of listOfReps) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = list.name;
        postEl.querySelector('p').textContent = list.description;
        postList.append(postEl);
    }


}

const printElement = () => {
    const text = txtBox.value.replace(/\s/g, "");
    
    if(text === ' ' || text === '' || text.length === 0) {
        alert('Please Check the UserName And Try Again');
    } else{
        fetchPosts(text);
    }
    
};



submitBtn.addEventListener('click', printElement);
