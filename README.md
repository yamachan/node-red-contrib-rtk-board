# node-red-contrib-rtk-board
A simple board function and node set for Node-RED

# Commands

RTK Board node gets command list as a String or an Array of String.

## Grammar

A semicolon ``;`` is a separator of commands.

A space character `` `` is a separator of arguments.

A starting dollar character ``$`` means a variable in argument list.

A starting dollar character and bracket ``$()``means a operational expression in argument list. You can refer the variables with ``$.`` name space in this operational expression.

A percent character ``%`` following the number means relative location against the campus size.

An under bar character ``_`` means the same as before command in argument list. The processing unit remember each argument value into the variable (for example, you can refer the last ``x`` location in the variable ``_x``), and this character shows the same value of it.

## Basic Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| init | - | Reset internal values |
| cls | color | Set line/fill color |
| w<br>width | width | Set line width |
| g<br>go<br>goTo | x, y | Move pen (absolute location) |
| m<br>move<br>moveTo | x, y | Move pen (relative location) |
| sr<br>rect<br>strokeRect | x, y, w, h, color, width | Draw a rectangle |
| fr<br>fillRect | x, y, w, h, color, width | Draw a filled rectangle |
| cr<br>clearRect | x, y, w, h | Clear a rectangle area |

## Path Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| bp<br>beginPath | - | Start a drawing path |
| cp<br>closePath | - | End a drawing path |
| l<br>line<br>lineTo | x, y | Path of line |
| arc | r, x, y, color, width | Path of arc |
| f<br>fill | color | End a drawing path with stroking |
| s<br>stroke | color | End a drawing path with filling |

## Calculation Commands

| Command | Arguments | Description |
| :-- | :-- | :-- |
| let | variable, value | Assign a value to a variable |
| add | variable, value | Add a value to a variable |
| sub | variable, value | Sub a value from a variable |
