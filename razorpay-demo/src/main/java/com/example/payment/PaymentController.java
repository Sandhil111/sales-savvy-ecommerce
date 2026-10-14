
package com.example.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam("amount") int amount)
            throws RazorpayException {

        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        RazorpayClient razorpay =
                new RazorpayClient(keyId, keySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", "INR");

        Order order = razorpay.orders.create(orderRequest);

        return order.toString();
    }

    @PostMapping("/get-key")
    public String getKey() {
        return keyId;
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(
            @RequestParam("razorpay_order_id") String orderId,
            @RequestParam("razorpay_payment_id") String paymentId,
            @RequestParam("razorpay_signature") String signature) {

        try {
            String payload = orderId + "|" + paymentId;

            boolean valid = Utils.verifySignature(
                    payload, signature, keySecret);

            if (valid) {
                return ResponseEntity.ok("success");
            }

            return ResponseEntity.badRequest().body("invalid");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Payment verification failed");
        }
    }
}
