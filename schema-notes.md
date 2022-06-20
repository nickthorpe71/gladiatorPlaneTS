Gladiator Plane Schema

user

- username
- email

warrior

- user_id
- first_name
- last_name
- nickname
- age
- height
- weight
- mutation_factor
- alive
- kills
- wins
- losses
- total_damage_done
- ambition
- intelligence
- maxHealth
- maxEndurance
- enduranceFactor
- flexibility
- strength
- accuracy
- dexterity
- reflex
- speed
- power
- toughness

battle

- battle_length
- warrior1
- warrior1_battle_stats_id
- warrior2
- warrior2_battle_stats_id
- winner
- loser

warriorBattleStats

- damageDone
- totalAttacks
- numberOfHits
- numberOfMisses
- numberOfCrits
