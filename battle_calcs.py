import random

def random_number(min, max):
    return random.randint(min, max)

def roll_to_hit(number_of_tests, char1_dex, char2_dex):
    i = 0
    hit = 0
    while i < number_of_tests:
        number1 = random_number(1, 23)
        to_hit = number1 + char1_dex

        number2 = random_number(1, 23)
        defended = number2 + char2_dex

        if to_hit > defended:
            hit += 1
        i += 1

    return hit

def calculate_damage(char1_str, char2_def):
    number1 = random_number(1, 20)
    damage = (char1_str + number1) - char2_def

    return damage

def time_to_kill(char1_HP, damage_function, hit_function):
    turn = 1
    char1_alive = True
    while char1_alive:
        if hit_function():
            print('hit!')
            char1_HP -= damage_function()
        else:
            print('miss!')
            turn += 1
            continue    
        if char1_HP < 1:
            char1_alive = False
            print('dead!')
            break
        turn += 1

    return turn        


barb_dex = 5
myr_dex = 6
hop_dex = 5

barb_str = 12
myr_str = 7
hop_str = 5

barb_def = 5
myr_def = 6
hop_def = 10

""" k = 0
total_hits = 0
while k < 10:
    hits = roll_to_hit(1000, barb_dex, myr_dex)
    total_hits += hits
    k += 1
print(f"Total hit chance: {total_hits / 100}%")


j = 0
total_damage = 0
while j < 100:
    damage = calculate_damage(barb_str, myr_def)
    total_damage += damage
    j += 1
print(f"Average damage: {total_damage / j}")    """ 

turns = time_to_kill(30, lambda: calculate_damage(barb_str, myr_def), lambda: roll_to_hit(1, barb_dex, myr_dex))
print(turns)