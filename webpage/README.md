## 1. Effect preview

## 2. Technology stack

1. Use Vue3+element-plus UI on the web

2. Use three.js for 3D display

## 3. Process

1. Create a new Vue3 project

2. Clear irrelevant beginner guide code

3. Install vue-router 4

4. Install three.js

5. Create src/views/home/index.vue as the homepage

6. Create a new src/layout/index.vue layout homepage

7. Create a new src/layout/components/Menu component

8. Create a new src/layout/components/Robot3d component

## 3. Core code

1. Use three.js to build a 3D robot

2. In addition to the necessary 3D scene elements, the initRobot method is the core of building a robot

- There are 5 active joints in total: D1~D5
- There are 4 strong arms in total They are: B1~B4
- Nested as child nodes starting from D1 according to the structure
- Finally rendered to generate the force arm

3. The setRobotRotation method provides external angle control
4. The setControlsEnabled method provides external viewing angle switch control