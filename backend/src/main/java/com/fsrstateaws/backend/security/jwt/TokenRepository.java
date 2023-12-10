package com.fsrstateaws.backend.security.jwt;

import com.fsrstateaws.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query(
        value = """
            SELECT t FROM Token t INNER JOIN User u \s
            ON t.user.id = u.id AND (t.expired = false OR t.revoked = false)
        """
    )
    List<Token> allValidTokensByUser(Long id);

    Optional<Token> findByToken(String token);
}
