<template>
  <el-scrollbar height="100%">
    <div class="slider-block">
      <!-- Switch for mouse view controller -->
      <div class="slider-item">
        <span class="demonstration">Mouse view controller</span>
        <el-switch v-model="mouseValue" @change="switchChange" />
      </div>

      <!-- Slider Controls for Joints -->
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
        <span class="demonstration">Rotate around X axis</span>
        <el-slider
          v-model="value5_1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'x')"
        />
        <span class="demonstration">Rotate around the Y axis</span>
        <el-slider
          v-model="value5_2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'y')"
        />
        <span class="demonstration">Rotate around the Z axis</span>
        <el-slider
          v-model="value5_3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'z')"
        />
      </div>

      <!-- Command Input -->
      <div class="slider-item">
        <span class="demonstration">Enter Command:</span>
        <el-input
          v-model="command"
          placeholder="Type a command here..."
          @keyup.enter="sendCommand"
          clearable
        />
        <el-button type="primary" @click="sendCommand">Execute</el-button>
      </div>
    </div>

    <!-- Local Activity Logs (optional immediate display) -->
    <div class="activity-logs">
      <h2>Recent Activity</h2>
      <el-scrollbar height="200px">
        <!-- The newest entry is displayed first (unshift in recordActivity) -->
        <div v-for="(log, index) in activityLogs" :key="index" class="log-item">
          <strong>{{ log.timestamp }}</strong> —
          <span>{{ log.message }}</span>
        </div>
      </el-scrollbar>
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

const command = ref("");

const min = ref(Number(-Math.PI.toFixed(2)));
const max = ref(Number(Math.PI.toFixed(2)));

const activityLogs = ref([]);

// Emit definitions for parent listeners
const emit = defineEmits(["sliderInput", "switchChange"]);

/** 
 * recordActivity: 
 * 1) Insert log at the top of local array for immediate UI
 * 2) POST to /api/logs so it's stored in MongoDB
 */
async function recordActivity(message) {
  const newLog = {
    timestamp: new Date().toLocaleString(),
    message
  };

  // 1) local display
  activityLogs.value.unshift(newLog);

  // 2) Persist in DB via /api/logs
  try {
    const response = await fetch("http://localhost:5000/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog),
    });
    const result = await response.json();
    console.log("Log saved in DB:", result);
  } catch (err) {
    console.error("Error saving log:", err);
  }
}

/** 
 * Switch Handler
 */
function switchChange(e) {
  emit("switchChange", e);
  recordActivity(`Mouse view controller switched ${e ? "ON" : "OFF"}`);
}

/**
 * Slider Handler
 * Pass the updated slider value to the server and log it
 */
async function sliderInput(value, name, direction) {
  emit("sliderInput", value, name, direction);
  
  // log locally & in DB
  recordActivity(`Joint ${name} updated. Axis: ${direction}, Value: ${value.toFixed(2)}`);

  // Send slider data to your backend for real-time arm control
  const data = { name, direction, value };
  try {
    const response = await fetch("http://localhost:5000/api/joint-values", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Joint values response:", result);
  } catch (error) {
    console.error("Error sending joint values:", error);
  }
}

/**
 * Command Input Handler
 * Log the command, then POST it to backend
 */
async function sendCommand() {
  if (command.value.trim() === "") {
    console.warn("Command field is empty!");
    return;
  }

  recordActivity(`Command executed: "${command.value}"`);

  // Also send to your arm command endpoint
  const data = { command: command.value };
  try {
    const response = await fetch("http://localhost:3000/api/commands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Command response:", result);
    command.value = "";
  } catch (error) {
    console.error("Error sending command:", error);
  }
}
</script>

<style scoped>
.slider-block {
  padding: 20px 10px;
}
.slider-item {
  margin: 20px 0;
}
.demonstration {
  margin: 0 10px 10px 0;
}
.activity-logs {
  margin: 2rem 0;
}
.log-item {
  margin-bottom: 8px;
}
</style>
