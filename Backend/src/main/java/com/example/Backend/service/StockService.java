package com.example.Backend.service;

import com.example.Backend.model.Stock;
import com.example.Backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getStocksByUserId(Long userId) {
        return stockRepository.findByUserId(userId);
    }

    public Stock addStock(Stock stock) {
        stock.setLastUpdated(LocalDate.now());
        return stockRepository.save(stock);
    }

    public Optional<Stock> updateStock(Long id, Stock stockDetails) {
        Optional<Stock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isPresent()) {
            Stock stock = optionalStock.get();
            stock.setName(stockDetails.getName());
            stock.setTicker(stockDetails.getTicker());
            stock.setQuantity(stockDetails.getQuantity());
            stock.setBuyPrice(stockDetails.getBuyPrice());
            stock.setLastUpdated(LocalDate.now());
            return Optional.of(stockRepository.save(stock));
        }
        return Optional.empty();
    }

    public boolean deleteStock(Long id) {
        if (stockRepository.existsById(id)) {
            stockRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
