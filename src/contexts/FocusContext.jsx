import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const FocusContext = createContext();

const MOCK_APPS = [
  { id: 'instagram', name: 'Instagram', category: 'Social', icon: '📸', blocked: true },
  { id: 'whatsapp', name: 'WhatsApp', category: 'Social', icon: '💬', blocked: true },
  { id: 'youtube', name: 'YouTube', category: 'Entertainment', icon: '📺', blocked: true },
  { id: 'discord', name: 'Discord', category: 'Social', icon: '🎮', blocked: true },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', icon: '🍿', blocked: false },
  { id: 'tiktok', name: 'TikTok', category: 'Social', icon: '🎵', blocked: true },
  { id: 'spotify', name: 'Spotify', category: 'Entertainment', icon: '🎵', blocked: false },
  { id: 'roblox', name: 'Roblox', category: 'Gaming', icon: '🧱', blocked: true },
];

const INITIAL_SCHEDULER = {
  enabled: false,
  startTime: '09:00',
  endTime: '10:30',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

const DUMMY_NOTIFICATIONS = [
  { app: 'Instagram', message: 'New photo liked by @alex_jones', icon: '📸' },
  { app: 'WhatsApp', message: 'Group chat: "Are we hanging out tonight?"', icon: '💬' },
  { app: 'YouTube', message: 'MrBeast uploaded a new video: "I Survived 100 Days..."', icon: '📺' },
  { app: 'Discord', message: 'Ping in #gaming: "Need +1 for ranked lobby now!"', icon: '🎮' },
  { app: 'TikTok', message: 'Trending now: "Check out this crazy viral glitch!"', icon: '🎵' },
  { app: 'Snapchat', message: 'New Snap from Kyle (streaks 🔥)', icon: '👻' },
  { app: 'WhatsApp', message: 'Mom: "Did you finish your math homework?"', icon: '💬' },
];

export const FocusProvider = ({ children }) => {
  // --- 1. CORE STATES ---
  const [isFocusModeActive, setIsFocusModeActive] = useState(() => {
    return localStorage.getItem('db_focus_active') === 'true';
  });

  const [countdownTimer, setCountdownTimer] = useState(() => {
    const saved = localStorage.getItem('db_countdown');
    return saved ? parseInt(saved, 10) : 1500;
  });

  const [maxDuration, setMaxDuration] = useState(() => {
    const saved = localStorage.getItem('db_max_duration');
    return saved ? parseInt(saved, 10) : 1500;
  });

  const [rewardPoints, setRewardPoints] = useState(() => {
    const saved = localStorage.getItem('db_reward_points');
    return saved ? parseInt(saved, 10) : 320;
  });

  const [focusStreak, setFocusStreak] = useState(() => {
    const saved = localStorage.getItem('db_focus_streak');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [blockedNotifications, setBlockedNotifications] = useState(() => {
    const saved = localStorage.getItem('db_blocked_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [sessionHistory, setSessionHistory] = useState(() => {
    const saved = localStorage.getItem('db_session_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, duration: 1500, xpEarned: 100, date: '2026-05-25', success: true, label: 'Science Homework' },
      { id: 2, duration: 3000, xpEarned: 200, date: '2026-05-24', success: true, label: 'Math Prep' },
      { id: 3, duration: 1800, xpEarned: 0, date: '2026-05-23', success: false, label: 'History Essay (Cancelled)' },
      { id: 4, duration: 2700, xpEarned: 180, date: '2026-05-22', success: true, label: 'English Reading' }
    ];
  });

  const [schedulerState, setSchedulerState] = useState(() => {
    const saved = localStorage.getItem('db_scheduler');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULER;
  });

  const [appsList, setAppsList] = useState(() => {
    const saved = localStorage.getItem('db_apps_list');
    return saved ? JSON.parse(saved) : MOCK_APPS;
  });

  const [customSessionName, setCustomSessionName] = useState(() => {
    return localStorage.getItem('db_session_name') || 'Study Session';
  });

  // --- CLOUD SYNC STATE ---
  const [syncId, setSyncId] = useState(() => {
    return localStorage.getItem('db_sync_id') || null;
  });
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudError, setCloudError] = useState(null);

  const [activePersona, setActivePersona] = useState(() => {
    return localStorage.getItem('db_active_persona') || 'parent';
  });

  const isFocusRef = useRef(isFocusModeActive);
  isFocusRef.current = isFocusModeActive;

  const isUpdatingCloud = useRef(false);

  // --- 2. PERSIST TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('db_focus_active', isFocusModeActive);
  }, [isFocusModeActive]);

  useEffect(() => {
    localStorage.setItem('db_countdown', countdownTimer);
  }, [countdownTimer]);

  useEffect(() => {
    localStorage.setItem('db_max_duration', maxDuration);
  }, [maxDuration]);

  useEffect(() => {
    localStorage.setItem('db_reward_points', rewardPoints);
  }, [rewardPoints]);

  useEffect(() => {
    localStorage.setItem('db_focus_streak', focusStreak);
  }, [focusStreak]);

  useEffect(() => {
    localStorage.setItem('db_blocked_notifications', JSON.stringify(blockedNotifications));
  }, [blockedNotifications]);

  useEffect(() => {
    localStorage.setItem('db_session_history', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  useEffect(() => {
    localStorage.setItem('db_scheduler', JSON.stringify(schedulerState));
  }, [schedulerState]);

  useEffect(() => {
    localStorage.setItem('db_apps_list', JSON.stringify(appsList));
  }, [appsList]);

  useEffect(() => {
    localStorage.setItem('db_session_name', customSessionName);
  }, [customSessionName]);

  useEffect(() => {
    if (syncId) {
      localStorage.setItem('db_sync_id', syncId);
    } else {
      localStorage.removeItem('db_sync_id');
    }
  }, [syncId]);

  useEffect(() => {
    localStorage.setItem('db_active_persona', activePersona);
  }, [activePersona]);

  // --- 3. DYNAMIC FLASK API BASE URL CONSTRUCTOR ---
  const getApiUrl = (endpoint = '') => {
    const hostname = window.location.hostname || 'localhost';
    // Check if we are running in a local/development environment
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.');
    if (isLocal) {
      return `http://${hostname}:5000/api/session${endpoint}`;
    }
    // Deployed environment (e.g., Vercel) - use relative path to avoid CORS, HTTPS/Mixed Content, and Port issues
    return `/api/session${endpoint}`;
  };

  // --- 4. CLOUD SYNC LOGIC (Flask local network database API) ---
  const pushStateToCloud = async (overrideStates = {}) => {
    if (!syncId || isUpdatingCloud.current) return;
    
    try {
      isUpdatingCloud.current = true;
      const stateToPush = {
        isFocusModeActive: overrideStates.hasOwnProperty('isFocusModeActive') ? overrideStates.isFocusModeActive : isFocusModeActive,
        countdownTimer: overrideStates.hasOwnProperty('countdownTimer') ? overrideStates.countdownTimer : countdownTimer,
        maxDuration: overrideStates.hasOwnProperty('maxDuration') ? overrideStates.maxDuration : maxDuration,
        rewardPoints: overrideStates.hasOwnProperty('rewardPoints') ? overrideStates.rewardPoints : rewardPoints,
        focusStreak: overrideStates.hasOwnProperty('focusStreak') ? overrideStates.focusStreak : focusStreak,
        blockedNotifications: overrideStates.hasOwnProperty('blockedNotifications') ? overrideStates.blockedNotifications : blockedNotifications,
        sessionHistory: overrideStates.hasOwnProperty('sessionHistory') ? overrideStates.sessionHistory : sessionHistory,
        schedulerState: overrideStates.hasOwnProperty('schedulerState') ? overrideStates.schedulerState : schedulerState,
        appsList: overrideStates.hasOwnProperty('appsList') ? overrideStates.appsList : appsList,
        customSessionName: overrideStates.hasOwnProperty('customSessionName') ? overrideStates.customSessionName : customSessionName,
        lastUpdatedBy: activePersona,
        timestamp: Date.now()
      };

      await fetch(getApiUrl(`/${syncId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stateToPush)
      });
    } catch (err) {
      console.error('Error syncing state to Flask Server:', err);
    } finally {
      isUpdatingCloud.current = false;
    }
  };

  const pullStateFromCloud = async () => {
    if (!syncId || isUpdatingCloud.current) return;

    try {
      const res = await fetch(getApiUrl(`/${syncId}`));
      if (!res.ok) throw new Error('Cloud sync session not found');
      const cloudState = await res.json();

      if (cloudState.lastUpdatedBy && cloudState.lastUpdatedBy !== activePersona) {
        isUpdatingCloud.current = true;
        
        if (activePersona === 'student') {
          if (cloudState.isFocusModeActive !== isFocusModeActive) {
            setIsFocusModeActive(cloudState.isFocusModeActive);
            if (cloudState.isFocusModeActive) {
              setCountdownTimer(cloudState.countdownTimer);
              setMaxDuration(cloudState.maxDuration);
            }
          }
          if (cloudState.customSessionName !== customSessionName) setCustomSessionName(cloudState.customSessionName);
          if (cloudState.appsList) setAppsList(cloudState.appsList);
          if (cloudState.schedulerState) setSchedulerState(cloudState.schedulerState);
        } else if (activePersona === 'parent') {
          if (cloudState.countdownTimer !== countdownTimer) setCountdownTimer(cloudState.countdownTimer);
          if (cloudState.rewardPoints !== rewardPoints) setRewardPoints(cloudState.rewardPoints);
          if (cloudState.focusStreak !== focusStreak) setFocusStreak(cloudState.focusStreak);
          if (cloudState.blockedNotifications) setBlockedNotifications(cloudState.blockedNotifications);
          if (cloudState.sessionHistory) setSessionHistory(cloudState.sessionHistory);
          if (cloudState.isFocusModeActive !== isFocusModeActive) setIsFocusModeActive(cloudState.isFocusModeActive);
        }

        isUpdatingCloud.current = false;
      }
    } catch (err) {
      console.error('Error fetching state from Flask Server:', err);
    }
  };

  const generateCloudSync = async () => {
    setIsCloudSyncing(true);
    setCloudError(null);
    try {
      const initialState = {
        isFocusModeActive,
        countdownTimer,
        maxDuration,
        rewardPoints,
        focusStreak,
        blockedNotifications,
        sessionHistory,
        schedulerState,
        appsList,
        customSessionName,
        lastUpdatedBy: 'student',
        timestamp: Date.now()
      };

      const res = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialState)
      });
      if (!res.ok) throw new Error('Could not initialize Flask session');
      const responseData = await res.json();
      
      const newId = responseData.id;
      if (!newId) throw new Error('Flask response did not contain session id');

      setSyncId(newId);
      setIsCloudSyncing(false);
      return newId;
    } catch (err) {
      console.error(err);
      setCloudError('Flask Sync Server is offline. Run "python server.py" first.');
      setIsCloudSyncing(false);
      return null;
    }
  };

  const connectToCloudSync = async (id) => {
    if (!id) return false;
    setIsCloudSyncing(true);
    setCloudError(null);
    try {
      const code = id.toUpperCase().trim();
      const res = await fetch(getApiUrl(`/${code}`));
      if (!res.ok) throw new Error('Invalid Sync ID or Flask Server connection error');
      const cloudState = await res.json();

      setSyncId(code);
      setIsFocusModeActive(cloudState.isFocusModeActive);
      setCountdownTimer(cloudState.countdownTimer);
      setMaxDuration(cloudState.maxDuration);
      setRewardPoints(cloudState.rewardPoints);
      setFocusStreak(cloudState.focusStreak);
      setBlockedNotifications(cloudState.blockedNotifications || []);
      setSessionHistory(cloudState.sessionHistory || []);
      setSchedulerState(cloudState.schedulerState || INITIAL_SCHEDULER);
      setAppsList(cloudState.appsList || MOCK_APPS);
      setCustomSessionName(cloudState.customSessionName || 'Study Session');

      setIsCloudSyncing(false);
      return true;
    } catch (err) {
      console.error(err);
      setCloudError('Failed to connect. Ensure Flask Server is running and Code is valid.');
      setIsCloudSyncing(false);
      return false;
    }
  };

  const disconnectCloudSync = () => {
    setSyncId(null);
    setCloudError(null);
  };

  // Polling loop
  useEffect(() => {
    let interval = null;
    if (syncId) {
      interval = setInterval(() => {
        pullStateFromCloud();
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [syncId, activePersona, isFocusModeActive, countdownTimer, rewardPoints, focusStreak, blockedNotifications, sessionHistory, customSessionName]);

  // --- 5. LOCAL STORAGE TAB SYNC ---
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'db_focus_active') {
        const val = e.newValue === 'true';
        setIsFocusModeActive(val);
      } else if (e.key === 'db_countdown') {
        if (e.newValue) setCountdownTimer(parseInt(e.newValue, 10));
      } else if (e.key === 'db_max_duration') {
        if (e.newValue) setMaxDuration(parseInt(e.newValue, 10));
      } else if (e.key === 'db_reward_points') {
        if (e.newValue) setRewardPoints(parseInt(e.newValue, 10));
      } else if (e.key === 'db_focus_streak') {
        if (e.newValue) setFocusStreak(parseInt(e.newValue, 10));
      } else if (e.key === 'db_blocked_notifications') {
        if (e.newValue) setBlockedNotifications(JSON.parse(e.newValue));
      } else if (e.key === 'db_session_history') {
        if (e.newValue) setSessionHistory(JSON.parse(e.newValue));
      } else if (e.key === 'db_scheduler') {
        if (e.newValue) setSchedulerState(JSON.parse(e.newValue));
      } else if (e.key === 'db_apps_list') {
        if (e.newValue) setAppsList(JSON.parse(e.newValue));
      } else if (e.key === 'db_session_name') {
        if (e.newValue) setCustomSessionName(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // --- 6. COUNTDOWN TIMER LOGIC ---
  useEffect(() => {
    let interval = null;
    if (isFocusModeActive && countdownTimer > 0) {
      interval = setInterval(() => {
        setCountdownTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFocusSessionComplete();
            return 0;
          }
          const nextSec = prev - 1;
          if (syncId && nextSec % 5 === 0 && activePersona === 'student') {
            pushStateToCloud({ countdownTimer: nextSec });
          }
          return nextSec;
        });
      }, 1000);
    } else if (!isFocusModeActive && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusModeActive, countdownTimer, syncId, activePersona]);

  const handleFocusSessionComplete = () => {
    setIsFocusModeActive(false);
    const newXP = rewardPoints + 100;
    const newStreak = focusStreak + 1;
    setRewardPoints(newXP);
    setFocusStreak(newStreak);

    const newSession = {
      id: Date.now(),
      duration: maxDuration,
      xpEarned: 100,
      date: new Date().toISOString().split('T')[0],
      success: true,
      label: customSessionName || 'Study Focus'
    };
    const updatedHistory = [newSession, ...sessionHistory];
    setSessionHistory(updatedHistory);
    setCountdownTimer(maxDuration);

    if (syncId) {
      pushStateToCloud({
        isFocusModeActive: false,
        countdownTimer: maxDuration,
        rewardPoints: newXP,
        focusStreak: newStreak,
        sessionHistory: updatedHistory
      });
    }
  };

  // --- 7. NOTIFICATION BLOCKING SIMULATION ---
  useEffect(() => {
    let timeout = null;
    
    const triggerNotification = () => {
      if (!isFocusRef.current) return;

      const activeBlockedApps = appsList.filter((a) => a.blocked);
      if (activeBlockedApps.length === 0) return;

      const randomApp = activeBlockedApps[Math.floor(Math.random() * activeBlockedApps.length)];
      const relevantNotifs = DUMMY_NOTIFICATIONS.filter(
        (n) => n.app.toLowerCase() === randomApp.name.toLowerCase()
      );
      
      const notifData = relevantNotifs.length > 0 
        ? relevantNotifs[Math.floor(Math.random() * relevantNotifs.length)]
        : { app: randomApp.name, message: 'New notification intercepted', icon: randomApp.icon };

      const newNotif = {
        id: Date.now(),
        app: notifData.app,
        icon: randomApp.icon,
        message: notifData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      const updatedNotifs = [newNotif, ...blockedNotifications];
      setBlockedNotifications(updatedNotifs);

      if (syncId && activePersona === 'student') {
        pushStateToCloud({ blockedNotifications: updatedNotifs });
      }

      const randomInterval = Math.floor(Math.random() * 7000) + 8000;
      timeout = setTimeout(triggerNotification, randomInterval);
    };

    if (isFocusModeActive) {
      const initialDelay = Math.floor(Math.random() * 4000) + 3000;
      timeout = setTimeout(triggerNotification, initialDelay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocusModeActive, appsList, syncId, activePersona, blockedNotifications]);

  // --- 8. SCHEDULER MONITORING LOGIC ---
  useEffect(() => {
    const checkSchedule = () => {
      if (!schedulerState.enabled) return;

      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      if (!schedulerState.days.includes(currentDay)) return;

      const currentTimeStr = now.toTimeString().slice(0, 5);
      
      if (currentTimeStr === schedulerState.startTime && !isFocusRef.current) {
        const durationSec = 1500;
        setIsFocusModeActive(true);
        setMaxDuration(durationSec);
        setCountdownTimer(durationSec);

        if (syncId && activePersona === 'parent') {
          pushStateToCloud({
            isFocusModeActive: true,
            maxDuration: durationSec,
            countdownTimer: durationSec
          });
        }
      } else if (currentTimeStr === schedulerState.endTime && isFocusRef.current) {
        handleFocusSessionComplete();
      }
    };

    const interval = setInterval(checkSchedule, 60000);
    checkSchedule();

    return () => clearInterval(interval);
  }, [schedulerState, syncId, activePersona]);

  // --- 9. ACTION CONTROLLERS ---
  const toggleFocusMode = () => {
    let updatedHistory = sessionHistory;

    if (isFocusModeActive) {
      setIsFocusModeActive(false);
      const newSession = {
        id: Date.now(),
        duration: maxDuration - countdownTimer,
        xpEarned: 0,
        date: new Date().toISOString().split('T')[0],
        success: false,
        label: `${customSessionName} (Stopped Early)`
      };
      updatedHistory = [newSession, ...sessionHistory];
      setSessionHistory(updatedHistory);
      setCountdownTimer(maxDuration);
      
      if (syncId) {
        pushStateToCloud({
          isFocusModeActive: false,
          countdownTimer: maxDuration,
          sessionHistory: updatedHistory
        });
      }
    } else {
      setIsFocusModeActive(true);
      setCountdownTimer(maxDuration);
      
      if (syncId) {
        pushStateToCloud({
          isFocusModeActive: true,
          countdownTimer: maxDuration,
          maxDuration: maxDuration
        });
      }
    }
  };

  const setTimerDuration = (minutes) => {
    const sec = minutes * 60;
    setMaxDuration(sec);
    setCountdownTimer(sec);
    if (syncId && activePersona === 'parent') {
      pushStateToCloud({
        maxDuration: sec,
        countdownTimer: sec
      });
    }
  };

  const toggleAppBlocking = (appId) => {
    const updatedApps = appsList.map((app) => 
      app.id === appId ? { ...app, blocked: !app.blocked } : app
    );
    setAppsList(updatedApps);
    if (syncId && activePersona === 'parent') {
      pushStateToCloud({ appsList: updatedApps });
    }
  };

  const clearNotificationLog = () => {
    setBlockedNotifications([]);
    if (syncId && activePersona === 'parent') {
      pushStateToCloud({ blockedNotifications: [] });
    }
  };

  return (
    <FocusContext.Provider
      value={{
        isFocusModeActive,
        setIsFocusModeActive,
        countdownTimer,
        setCountdownTimer,
        maxDuration,
        rewardPoints,
        setRewardPoints,
        focusStreak,
        setFocusStreak,
        blockedNotifications,
        setBlockedNotifications,
        sessionHistory,
        setSessionHistory,
        schedulerState,
        setSchedulerState,
        appsList,
        setAppsList,
        customSessionName,
        setCustomSessionName,
        toggleFocusMode,
        setTimerDuration,
        toggleAppBlocking,
        clearNotificationLog,
        // CLOUD SYNC
        syncId,
        isCloudSyncing,
        cloudError,
        activePersona,
        setActivePersona,
        generateCloudSync,
        connectToCloudSync,
        disconnectCloudSync,
        pushStateToCloud
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};
