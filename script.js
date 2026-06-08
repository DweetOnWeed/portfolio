const hero = document.getElementById('hero')
const desc = document.querySelector('#hero .desc')
const tag = document.querySelector('#hero .tag')

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    const heroHeight = hero.offsetHeight
    const progress = Math.min(scrolled / heroHeight, 1)
    hero.style.opacity = 1 - progress * 0.5
    hero.style.transform = `scale(${1 - progress * 0.1})`
    desc.style.opacity = 1 - progress * 1.5
    tag.style.opacity = 1 - progress * 1.2
})

function shuffle(array) {
    let currentIdx = array.length

    while (currentIdx != 0) {
        let randomIdx = Math.floor(Math.random() * currentIdx)
        currentIdx--

        [array[currentIdx], array[randomIdx]] = [array[randomIdx], array[currentIdx]]
    }
}

// terminal
const commands = [
    'cargo new your_project',
    'cargo add tokio',
    'cargo build',
    'cargo run',
    './scanner --target 192.168.1.1',
    'ssh louis@raspberrypi',
    'sudo systemctl start estate-bot',
]

shuffle(commands)
const typed = document.getElementById('typed')
let cmdIndex = 0
let charIndex = 0
let deleting = false

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 300

function tick() {
    const current = commands[cmdIndex]

    if (!deleting) {
        charIndex++
        typed.textContent = current.slice(0, charIndex)
        if (charIndex === current.length) {
            deleting = true
            setTimeout(tick, PAUSE_AFTER_TYPE)
            return
        }
    } else {
        charIndex--
        typed.textContent = current.slice(0, charIndex)
        if (charIndex === 0) {
            deleting = false
            cmdIndex = (cmdIndex + 1) % commands.length
            setTimeout(tick, PAUSE_AFTER_DELETE)
            return
        }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED)
}

tick()