var sel
var ctdown
var currentQC
var score
var database = [{
        q: 'Commonly used data types Do Not include:',
        c: {
            1: 'Strings',
            2: 'Booleans',
            3: 'Alerts',
            4: 'Numbers'
        },
        a: 3
    },

    {
        q: 'The condition in an if/else statement is enclosed with ______.',
        c: {
            1: 'Quotes',
            2: 'Curly brackets',
            3: 'Parentheses',
            4: 'Square brackets'
        },
        a: 3
    },

    {
        q: 'Arrays in JavaScript can be used to store ______.',
        c: {
            1: 'Numbers and strings',
            2: 'Other arrays',
            3: 'Booleans',
            4: 'All of the above'
        },
        a: 4
    },

    {
        q: 'String values must be enclosed within ______ when being assigned to variables.',
        c: {
            1: 'Quotes',
            2: 'Curly brackets',
            3: 'Commas',
            4: 'Parentheses'
        },
        a: 1
    },

    {
        q: 'A very useful tool used during development and debugging for printing content to the debugger is?',
        c: {
            1: 'JavaScript',
            2: 'Terminal/bash',
            3: 'For loops',
            4: 'Console.log'
        },
        a: 4
    }
]

function main() {
    makeQC(database)
    ctdown = 7500
    document.getElementById('time').textContent = Math.floor(ctdown / 100)
    score = 0
    setInterval(function() {
        document.getElementById('time').textContent = Math.floor(ctdown / 100)
        if (ctdown > 0) {
            ctdown--
        } else {
            jump2score()
        }
    }, 10)
}

function makeQC(obj) {
    console.log('dmsg: makeQC')
    sel = generateSelector(obj)
    loadQC(obj, sel)
    document.getElementById('score').textContent = score
}

function generateSelector(obj) {
    console.log('dmsg: generateSelector')
    var n = obj.length
    return Math.floor(
        (window.crypto.getRandomValues(new Uint32Array(2))[0] / 0xffffffff) * n
    )
}

function loadQC(obj, index) {
    console.log('dmsg: loadQC')
    renderQC(obj[index])
    currentQC = obj.splice(index, 1)
}

function renderQC(obj) {
    console.log('dmsg: renderQC')
    console.dir(Object.keys(obj))
    console.log(obj.q)
    console.dir(document.getElementsByTagName('h3'))
    document.getElementById('question').textContent = obj.q
    console.dir(document.getElementsByTagName('h3'))
    document.getElementById('choice').innerHTML = ''
    for (var key in obj.c) {
        var cDiv = document.createElement('div')
        var cBtn = document.createElement('button')
        cBtn.classList.add('btn', 'btn-primary', 'v-left')
        cBtn.id = key
        console.log(key)
        console.dir(obj.c[key])
        cBtn.textContent = obj.c[key]
        document.getElementById('choice').appendChild(cDiv)
        cDiv.appendChild(cBtn)
        console.dir(cBtn)
    }
}

function jump2score() {
    score += ctdown / 5
    ctdown = 0
    window.localStorage.setItem('score', score)
    console.log(window.localStorage.getItem('score'))
    document.location.href = 'highscore.html'
}

main()
document.querySelector('#choice').addEventListener('click', function(e) {
    console.log('dmsg: chka')
    var userSel = Number(e.target.id)
    if (userSel === currentQC[0].a) {
        score += 300
        document.getElementById('score').textContent = score
        document.querySelector('.answer').textContent = 'Correct!'
        if (database.length > 0) {
            makeQC(database)
        } else {
            jump2score()
        }
    } else {
        document.querySelector('.answer').textContent = 'Wrong!'
        if (ctdown > 1500) {
            ctdown -= 1500
        } else {
            ctdown = 0
        }
    }
})