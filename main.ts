namespace SpriteKind {
    export const Obstacle = SpriteKind.create()
}
// Столкновения
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstacle, function (sprite, otherSprite) {
    game.over(false)
})
// Прыжок
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player2.y >= 103) {
        player2.vy = -180
    }
})
let sky = 0
let frame = 0
let fromTop = false
let color = 0
let obstacle: Sprite = null
let _type = 0
let size = 0
let player2: Sprite = null
player2 = sprites.create(img`
    . . . . . 8 8 8 . . . . 
    . . . . 8 8 8 8 8 . . . 
    . . . . 8 1 8 1 8 . . . 
    . . . . 8 8 8 8 8 . . . 
    . . . . . 8 8 8 . . . . 
    . . . . 2 2 2 2 . . . . 
    . . . 2 2 2 2 2 2 . . . 
    . . . . 2 2 2 2 . . . . 
    . . . . 2 . . 2 . . . . 
    . . . 2 2 . . 2 2 . . . 
    . . . 2 . . . . 2 . . . 
    . . . 2 . . . . 2 . . . 
    `, SpriteKind.Player)
scene.setBackgroundColor(9)
player2.setPosition(30, 104)
player2.ay = 500
let speed = 65
let colors = [
9,
12,
8,
1,
13,
6,
15
]
// Земля
game.onUpdate(function () {
    if (player2.y > 104) {
        player2.y = 104
        player2.vy = 0
    }
})
// Создание препятствий
game.onUpdateInterval(1300, function () {
    size = randint(12, 28)
    _type = randint(0, 2)
    obstacle = sprites.create(image.create(size, size), SpriteKind.Obstacle)
    color = randint(2, 14)
    obstacle.image.fill(color)
    if (_type == 1) {
        obstacle.image.fill(0)
        obstacle.image.drawLine(0, size - 1, size / 2, 0, color)
        obstacle.image.drawLine(size / 2, 0, size - 1, size - 1, color)
        obstacle.image.drawLine(size - 1, size - 1, 0, size - 1, color)
    }
    if (_type == 2) {
        obstacle.image.fill(0)
        obstacle.image.drawLine(size / 2, 0, size - 1, size / 2, color)
        obstacle.image.drawLine(size - 1, size / 2, size / 2, size - 1, color)
        obstacle.image.drawLine(size / 2, size - 1, 0, size / 2, color)
        obstacle.image.drawLine(0, size / 2, size / 2, 0, color)
    }
    fromTop = randint(0, 3) == 0
    if (fromTop) {
        obstacle.setPosition(160, 5)
        obstacle.vy = 35
    } else {
        obstacle.setPosition(160, 120 - size / 2)
    }
    obstacle.vx = 0 - speed
    obstacle.setFlag(SpriteFlag.AutoDestroy, true)
})
// Постепенное ускорение без предупреждений
game.onUpdateInterval(5000, function () {
    speed += 8
})
// Очки
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
// Анимация человечка
game.onUpdateInterval(150, function () {
    frame += 1
    if (player2.y >= 103) {
        if (frame % 2 == 0) {
            player2.image.flipX()
        }
    }
})
// Изменение неба
game.onUpdateInterval(10000, function () {
    sky += 1
    if (sky >= colors.length) {
        sky = 0
    }
    scene.setBackgroundColor(colors[sky])
})
