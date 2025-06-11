(define-constant rarity-common u0)
(define-constant rarity-rare u1)
(define-constant rarity-epic u2)

(define-data-var next-token-id uint u1)
(define-map token-owners { token-id: uint } principal)
(define-map token-metadata { token-id: uint } { name: (string-ascii 32), rarity: uint })
(define-map rarity-card-id-map { rarity: uint } uint)

(define-public (init-card-ids) (response bool uint)
  (begin
    (map-set rarity-card-id-map { rarity: rarity-common } u1001)
    (map-set rarity-card-id-map { rarity: rarity-rare } u2001)
    (map-set rarity-card-id-map { rarity: rarity-epic } u3001)
    (ok true)
  )
)

(define-private (generate-card-id (rarity uint)) (response uint uint)
  (match (map-get rarity-card-id-map { rarity: rarity })
    id
      (begin
        (map-set rarity-card-id-map { rarity: rarity } (+ id u1))
        (ok id)
      )
    (err u100)
  )
)

(define-private (mint-card (recipient principal) (rarity uint)) (response uint uint)
  (match (generate-card-id rarity)
    new-card-id
      (let (
        (token-id (var-get next-token-id))
      )
        (begin
          (map-set token-owners { token-id: token-id } recipient)
          (map-set token-metadata { token-id: token-id } { name: "Card", rarity: rarity })
          (var-set next-token-id (+ token-id u1))
          (ok token-id)
        )
      )
    (err u101)
  )
)

(define-public (buy-card-pack) (response (list 3 uint) uint)
  (let (
    (sender tx-sender)
    (res1 (mint-card sender rarity-common))
  )
    (match res1 ok-card1
      (let (
        (res2 (mint-card sender rarity-rare))
      )
        (match res2 ok-card2
          (let (
            (res3 (mint-card sender rarity-epic))
          )
            (match res3 ok-card3
              (ok (list ok-card1 ok-card2 ok-card3))
              (err u104)
            )
          )
          (err u103)
        )
      )
      (err u102)
    )
  )
)

(define-read-only (get-token-owner (token-id uint)) (optional principal)
  (map-get token-owners { token-id: token-id })
)

(define-read-only (get-token-metadata (token-id uint)) (optional { name: (string-ascii 32), rarity: uint })
  (map-get token-metadata { token-id: token-id })
)
