// ============================================================================
// FIX #1: INDICATOR UPDATE LOOP - CORRECTED VERSION
// Location: server.js around line 2411
// Insert AFTER the "Update order books every 2 seconds" setInterval block
// ============================================================================

// Update indicators every 10 seconds
setInterval(async () => {
  for (const symbol of Object.keys(marketManagers)) {
    const manager = marketManagers[symbol];
    
    // Check if manager exists and has enough candles for indicators
    if (manager && manager.candles && manager.candles.length >= 50) {
      // broadcastMarketData() already calls getIndicators() internally
      // This recalculates all indicators and broadcasts to frontend
      broadcastMarketData(symbol);
    }
    
    await sleep(100); // Small delay between symbols to avoid overwhelming
  }
  
  // Optional: Log for debugging (comment out in production)
  // console.log(`[DEBUG] Indicators updated for ${Object.keys(marketManagers).length} symbols`);
}, 10000); // 10 seconds = 10000ms

// ============================================================================
// EXPLANATION:
// ============================================================================
// The MarketDataManager class has getIndicators() NOT calculateIndicators()
// 
// broadcastMarketData(symbol) does:
//   1. manager.getIndicators() - Calculates all 8 indicators fresh
//   2. manager.generateSignal() - Generates trading signal
//   3. broadcast() - Sends to all connected clients
//
// So we just need to call broadcastMarketData() every 10 seconds!
// ============================================================================
