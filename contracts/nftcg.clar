(define-constant RARITY_COMMON u1)
(define-constant RARITY_RARE u2)
(define-constant RARITY_EPIC u3)
(define-constant RARITY_LEGENDARY u4)

(define-map cards-metadata
  uint ;; card id
  {
    rarity: uint
  }
)

(define-public (initialize-cards)
  (begin
    (map-set cards-metadata u1 { rarity: RARITY_COMMON })
    (map-set cards-metadata u2 { rarity: RARITY_RARE })
    (map-set cards-metadata u3 { rarity: RARITY_EPIC })
    (map-set cards-metadata u4 { rarity: RARITY_LEGENDARY })
    (ok true)
  )
)

(define-read-only (get-card-id-by-rarity (rarity uint))
  (let (
    (r1 (unwrap-panic (map-get? cards-metadata u1)))
    (r2 (unwrap-panic (map-get? cards-metadata u2)))
    (r3 (unwrap-panic (map-get? cards-metadata u3)))
    (r4 (unwrap-panic (map-get? cards-metadata u4)))
  )
    (if (is-eq rarity (get rarity r1)) (ok u1)
      (if (is-eq rarity (get rarity r2)) (ok u2)
        (if (is-eq rarity (get rarity r3)) (ok u3)
          (if (is-eq rarity (get rarity r4)) (ok u4)
            (err "No card with this rarity found")
          )
        )
      )
    )
  )
)
