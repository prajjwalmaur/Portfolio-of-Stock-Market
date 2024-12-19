package com.example.Backend.controller;

import com.example.Backend.model.Stock;
import com.example.Backend.service.StockService;
import com.example.Backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private StockRepository stockRepository;

    @GetMapping
    public ResponseEntity<List<Stock>> getStocks(@RequestParam Long userId) {
        return ResponseEntity.ok(stockService.getStocksByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.addStock(stock));
    }

    @GetMapping("/{ticker}")
    public ResponseEntity<?> getStockByTicker(
            @PathVariable String ticker,
            @RequestParam Long userId) {

        // Find the stock by ticker and userId
        Stock stock = stockRepository.findByTickerAndUserId(ticker, userId);

        if (stock != null) {
            return ResponseEntity.ok(stock);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock not found for the user.");
        }
    }

    @PatchMapping
    public ResponseEntity<?> updateStock(@RequestBody Stock updatedStock, @RequestParam Long userId) {
        // Find the existing stock by ticker and userId
        Stock existingStock = stockRepository.findByTickerAndUserId(updatedStock.getTicker(), userId);

        if (existingStock != null) {
            // Update fields
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setBuyPrice(updatedStock.getBuyPrice());
            existingStock.setLastUpdated(updatedStock.getLastUpdated());

            // Save updated stock
            stockRepository.save(existingStock);
            return ResponseEntity.ok("Stock updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock not found for the user.");
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stockDetails) {
        return stockService.updateStock(id, stockDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
    //     if (stockService.deleteStock(id)) {
    //         return ResponseEntity.noContent().build();
    //     }
    //     return ResponseEntity.notFound().build();
    // }

    @DeleteMapping("/{ticker}")
    public ResponseEntity<?> deleteStock(@PathVariable String ticker, @RequestParam Long userId) {
        Stock stock = stockRepository.findByTickerAndUserId(ticker, userId);
        if (stock != null) {
            stockRepository.delete(stock);
            return ResponseEntity.ok("Stock deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock not found for the user.");
        }
    }
}
