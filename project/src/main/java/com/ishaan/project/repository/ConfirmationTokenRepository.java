package com.ishaan.project.repository;

import com.ishaan.project.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String> {

    ConfirmationToken findByConfirmationToken(String confirmationToken);
    ConfirmationToken findByTokenId(long tokenId);

}
