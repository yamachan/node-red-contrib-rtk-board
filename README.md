# node-red-contrib-rtk-board
A simple board function and node set for Node-RED

![a demo of face node](img/face_anim.gif)

# Nodes

## output node

![output node](img/node-output.png)



## face node

![output node](img/node-face.png)


# Commands

RTK Board node gets command list as a String or an Array of String.

## Grammar

A semicolon ``;`` is a separator of commands.

A space character `` `` is a separator of arguments.

A starting dollar character ``$`` means a variable in argument list.

A starting dollar character and bracket ``$()``means a operational expression in argument list. You can refer the variables with ``$.`` name space in this operational expression.

A percent character ``%`` following the number means relative location against the campus size.

An under bar character ``_`` means the same as before command in argument list. The processing unit remember each argument value into the variable (for example, you can refer the last ``x`` location in the variable ``_x``), and this character shows the same value of it.

Start with '#' shows a comment and/or label (label is not implimented yet). Start with '##' shows a comment, and also shows this text into brwser's console.

## Basic Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| init | - | Reset internal values |
| cls | color | Set line/fill color |
| c<br>color | color | Set color |
| cRand<br>colorRand | - | Set color randomly |
| w<br>width | width | Set line width |
| g<br>go<br>goTo | x, y | Move pen (absolute location) |
| gRand<br>goRand<br>goToRand | x, y | Move pen (absolute location) randomly |
| m<br>move<br>moveTo | x, y | Move pen (relative location) |
| sr<br>rect<br>strokeRect | x, y, w, h, color, width | Draw a rectangle |
| fr<br>fillRect | x, y, w, h, color, width | Draw a filled rectangle |
| cr<br>clearRect | x, y, w, h | Clear a rectangle area |
| font<br>tf<br>textFont | text_font | Set text font (e.g. 30px serif) |
| t<br>text<br>ft<br>fillText | text | Draw filled text |
| st<br>strokeText | text | Draw text curb |
| i<br>img<br>image | src, x, y | Draw an image from URL |
| iTo<br>imgTo<br>imageTo | src, x, y, w, h | Draw an image from URL with scaling |
| wait | - | wait async commands (e.g. image) |

## Path Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| bp<br>beginPath | - | Start a drawing path |
| cp<br>closePath | - | End a drawing path |
| lc<br>lineCap | line_cap | Shape used to draw the end points of lines<br>(butt, round or square) |
| l<br>line<br>lineTo | x, y | Path of line |
| arc | r, x, y, sa (start angle), ea (end angle), color, width | Path of arc |
| el<br>ellipse | w, h, x, y, sa, ea, ra (rotation angle), color, width | Path of ellipse |
| f<br>fill | color | End a drawing path with stroking |
| s<br>stroke | color | End a drawing path with filling |

## Calculation Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| let | variable, value | Assign a value to a variable |
| add | variable, value | Add a value to a variable |
| sub | variable, value | Sub a value from a variable |
| rand | variable, rand_bound | Assign a random value to a variable |

## Other Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| skip | step_delta | Change step with step_delta |
| if | condition_variable, step_delta | If condition is not 0, change step with step_delta |
| loop | name_of_counter_variable, step_delta | Sub 1 from counter;<br>If counter is not 0, change step with step_delta |
| nop | - | Do nothing |

## Arranged Library Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| face | face_mode, face_type, w, h, x, y, width, color | Draw a face |
