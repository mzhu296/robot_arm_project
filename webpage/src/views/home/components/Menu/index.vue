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

    <!-- Activity Logs Section -->
    <div class="activity-logs">
      <h2>Recent Activity</h2>
      <el-scrollbar height="200px">
        <!-- The newest item is displayed first -->
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

// ===== States for the Switch & Sliders =====
const mouseValue = ref(true);
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5_1 = ref(0);
const value5_2 = ref(0);
const value5_3 = ref(0);

// ===== Command Input =====
const command = ref("");

// ===== Slider Range Config =====
const min = ref(Number(-Math.PI.toFixed(2)));
const max = ref(Number(Math.PI.toFixed(2)));

// ===== Activity Logs (most recent first) =====
const activityLogs = ref([]);

// ===== Define Emits =====
const emit = defineEmits(["sliderInput", "switchChange"]);

/**
 * Helper function to record an activity event at the TOP of the list.
 * e.g. "Joint D1 updated. Axis: y, Value: 1.20"
 */
function recordActivity(message) {
  activityLogs.value.unshift({
    timestamp: new Date().toLocaleString(),
    message,
  });
}

// ===== Switch Handler =====
const switchChange = (e) => {
  emit("switchChange", e);
  recordActivity(`Mouse view controller switched ${e ? "ON" : "OFF"}`);
};

// ===== Slider Handler =====
const sliderInput = async (value, name, direction) => {
  emit("sliderInput", value, name, direction);

  // Record in local logs
  recordActivity(`Joint ${name} updated. Axis: ${direction}, Value: ${value.toFixed(2)}`);

  // Send data to your backend
  const data = { name, direction, value };
  try {
    const response = await fetch("http://localhost:3000/api/joint-values", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Backend response:", result);
  } catch (error) {
    console.error("Error sending slider data:", error);
  }
};

// ===== Command Execution =====
const sendCommand = async () => {
  if (command.value.trim() === "") {
    console.warn("Command field is empty!");
    return;
  }

  recordActivity(`Command executed: "${command.value}"`);

  // Send command to your backend
  const data = { command: command.value };
  try {
    const response = await fetch("http://localhost:3000/api/commands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Backend response:", result);
    command.value = ""; // Clear the command input
  } catch (error) {
    console.error("Error sending command:", error);
  }
};
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

/* Activity Logs Styling */
.activity-logs {
  margin: 2rem 0;
}

.activity-logs h2 {
  margin-bottom: 10px;
}

.log-item {
  margin-bottom: 8px;
}
</style>
