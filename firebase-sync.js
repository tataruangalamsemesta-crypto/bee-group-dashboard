// Firebase Real-time Database Sync Module
import { 
  database,
  ref,
  set,
  get,
  onValue,
  push,
  update
} from './firebase-config.js';

import { getUserId } from './firebase-auth.js';

// Save Weekly Update to Firebase
export async function saveWeeklyUpdate(data) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const updateRef = push(ref(database, `weeklyUpdates/${userId}`));
    const timestamp = new Date().toISOString();
    
    await set(updateRef, {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: userId
    });
    
    console.log('Weekly update saved:', updateRef.key);
    return { success: true, id: updateRef.key };
  } catch (error) {
    console.error('Error saving weekly update:', error);
    return { success: false, error: error.message };
  }
}

// Get Weekly Updates for current user
export async function getWeeklyUpdates() {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return [];
    }

    const snapshot = await get(ref(database, `weeklyUpdates/${userId}`));
    if (snapshot.exists()) {
      const updates = [];
      snapshot.forEach((childSnapshot) => {
        updates.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return updates;
    }
    return [];
  } catch (error) {
    console.error('Error getting weekly updates:', error);
    return [];
  }
}

// Listen to real-time Weekly Updates
export function listenWeeklyUpdates(callback) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    onValue(ref(database, `weeklyUpdates/${userId}`), (snapshot) => {
      if (snapshot.exists()) {
        const updates = [];
        snapshot.forEach((childSnapshot) => {
          updates.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        callback(updates);
      } else {
        callback([]);
      }
    });
  } catch (error) {
    console.error('Error listening to weekly updates:', error);
  }
}

// Save KPI Data to Firebase
export async function saveKPIData(unit, kpiData) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const timestamp = new Date().toISOString();
    await set(ref(database, `kpiData/${userId}/${unit}`), {
      ...kpiData,
      unit: unit,
      updatedAt: timestamp,
      userId: userId
    });
    
    console.log('KPI data saved for unit:', unit);
    return { success: true };
  } catch (error) {
    console.error('Error saving KPI data:', error);
    return { success: false, error: error.message };
  }
}

// Get KPI Data for current user
export async function getKPIData(unit) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return null;
    }

    const snapshot = await get(ref(database, `kpiData/${userId}/${unit}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error getting KPI data:', error);
    return null;
  }
}

// Listen to real-time KPI Data
export function listenKPIData(unit, callback) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    onValue(ref(database, `kpiData/${userId}/${unit}`), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error('Error listening to KPI data:', error);
  }
}

// Save Finance Data to Firebase
export async function saveFinanceData(financeData) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const timestamp = new Date().toISOString();
    await set(ref(database, `financeData/${userId}`), {
      ...financeData,
      updatedAt: timestamp,
      userId: userId
    });
    
    console.log('Finance data saved');
    return { success: true };
  } catch (error) {
    console.error('Error saving finance data:', error);
    return { success: false, error: error.message };
  }
}

// Get Finance Data for current user
export async function getFinanceData() {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return null;
    }

    const snapshot = await get(ref(database, `financeData/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error getting finance data:', error);
    return null;
  }
}

// Listen to real-time Finance Data
export function listenFinanceData(callback) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    onValue(ref(database, `financeData/${userId}`), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error('Error listening to finance data:', error);
  }
}

// Update KPI Status
export async function updateKPIStatus(unit, kpiName, status, value) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const updatePath = `kpiData/${userId}/${unit}/kpis/${kpiName}`;
    await update(ref(database, updatePath), {
      status: status,
      value: value,
      updatedAt: new Date().toISOString()
    });
    
    console.log('KPI status updated:', unit, kpiName, status);
    return { success: true };
  } catch (error) {
    console.error('Error updating KPI status:', error);
    return { success: false, error: error.message };
  }
}

// Get Activity Log for all users (team view)
export function listenActivityLog(callback) {
  try {
    onValue(ref(database, 'weeklyUpdates'), (snapshot) => {
      if (snapshot.exists()) {
        const activities = [];
        snapshot.forEach((userSnapshot) => {
          userSnapshot.forEach((updateSnapshot) => {
            activities.push({
              id: updateSnapshot.key,
              ...updateSnapshot.val()
            });
          });
        });
        // Sort by date descending
        activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(activities);
      } else {
        callback([]);
      }
    });
  } catch (error) {
    console.error('Error listening to activity log:', error);
  }
}