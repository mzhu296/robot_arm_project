<template>
  <el-scrollbar height="100%">
    <div class="slider-block">
      <div class="slider-item">
        <span class="demonstration">Mouse view controller</span>
        <el-switch v-model="mouseValue" @change="switchChange" />
      </div>
      <div class="slider-item">
        <span class="demonstration">Joint 1 (rotation around the Y axis)</span>
        <el-slider
          v-model="value1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D1', 'y')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">Joint 2 (rotation around the Z axis)</span>
        <el-slider
          v-model="value2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D2', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">Joint 3 (rotation around Z axis)</span>
        <el-slider
          v-model="value3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D3', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">Joint 4 (rotation around Z axis)</span>
        <el-slider
          v-model="value4"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D4', 'z')"
        />
      </div>
      <div class="slider-item">
        <p class="demonstration">Joint 5</p>
        <span class="demonstration">rotation around X axis</span>
        <el-slider
          v-model="value5_1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'x')"
        />
        <span class="demonstration">Rotate around the y axis</span>
        <el-slider
          v-model="value5_2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'y')"
        />
        <span class="demonstration">Rotate around the z axis</span>
        <el-slider
          v-model="value5_3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'z')"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const mouseValue = ref(true);
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);

const value5_1 = ref(0);
const value5_2 = ref(0);
const value5_3 = ref(0);

const min = ref(Number(-Math.PI.toFixed(2)));
const max = ref(Number(Math.PI.toFixed(2)));

const emit = defineEmits(["sliderInput", "switchChange"]);


const switchChange = (e) => {
  emit("switchChange", e);
};

const sliderInput = async (e, name, direction) => {
  emit("sliderInput", e, name, direction);

  // Prepare data to send
  const data = { name, direction, value: e };

  try {
    // Send POST request to the backend
    const response = await fetch("http://localhost:3000/api/joint-values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Backend response:", result);
  } catch (error) {
    console.error("Error sending data to the backend:", error);
  }
};

</script>

<style scope>
.slider-block {
  padding: 20px 10px;
}
.slider-item {
  margin: 20px 0;
}
.demonstration {
  margin: 0 10px 10px 0;
}
</style>
