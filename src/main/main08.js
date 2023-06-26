import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

// console.log(THREE);

// 目标：根据尺寸变化实现自适应画面

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 相机位置设置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 3;

// 缩放
// cube.scale.set(4, 3, 2);

// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染到canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染出来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼，让控制器更有真实的效果，必须在动画循环里调用.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画
var animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.inOut",
  // 设置重复次数，无限次循环就是-1
  repeat: -1,
  // 往返运动
  yoyo: true,
  onComplete: () => {
    console.log("动画完成了");
  },
  onStart: () => {
    console.log("动画开始了");
  },
});
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: "power1.inOut",
  // 设置重复次数，无限次循环就是-1
  repeat: 2,
  // 往返运动
  yoyo: true,
  // 延迟时间
  delay: 2,
});

window.addEventListener("dblclick", () => {
  console.log(animate1);
  if (animate1.isActive()) {
    // 暂停
    animate1.pause();
  } else {
    // 恢复
    animate1.resume();
  }
});

function render() {
  // // 获取时钟运行的总时长
  // let time = clock.getElapsedTime();
  // let deltaTime = clock.getDelta();
  // console.log("时钟运行的总时长：", time);
  // console.log("两次获取时间的间隔时间：", deltaTime);

  // let t = time % 5;
  // cube.position.x = t * 1;

  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面的变化，更新渲染画面
window.addEventListener("resize", () => {
  console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
