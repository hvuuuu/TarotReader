import os
import io
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

BASE_URL = "https://raw.githubusercontent.com/mixvlad/TarotCards/master/tarot/rider-waite/720px/"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "cards")

# Mapping of card ID (1-78) to source filename
MAPPING = {
    1: "00_Fool.jpg",
    2: "01_Magician.jpg",
    3: "02_High_Priestess.jpg",
    4: "03_Empress.jpg",
    5: "04_Emperor.jpg",
    6: "05_Hierophant.jpg",
    7: "06_Lovers.jpg",
    8: "07_Chariot.jpg",
    9: "08_Strength.jpg",
    10: "09_Hermit.jpg",
    11: "10_Wheel_of_Fortune.jpg",
    12: "11_Justice.jpg",
    13: "12_Hanged_Man.jpg",
    14: "13_Death.jpg",
    15: "14_Temperance.jpg",
    16: "15_Devil.jpg",
    17: "16_Tower.jpg",
    18: "17_Star.jpg",
    19: "18_Moon.jpg",
    20: "19_Sun.jpg",
    21: "20_Judgement.jpg",
    22: "21_World.jpg",
}

# 23-36: Wands 01-14
for i in range(1, 15):
    MAPPING[22 + i] = f"Wands{i:02d}.jpg"

# 37-50: Cups 01-14
for i in range(1, 15):
    MAPPING[36 + i] = f"Cups{i:02d}.jpg"

# 51-64: Swords 01-14
for i in range(1, 15):
    MAPPING[50 + i] = f"Swords{i:02d}.jpg"

# 65-78: Pentacles 01-14
for i in range(1, 15):
    MAPPING[64 + i] = f"Pents{i:02d}.jpg"

def process_card(card_id_and_file):
    card_id, src_filename = card_id_and_file
    url = BASE_URL + src_filename
    out_path = os.path.join(OUTPUT_DIR, f"{card_id}.webp")
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            # Resize slightly to standard card dimensions while maintaining aspect ratio (e.g. max width 480 for fast web delivery)
            img.thumbnail((480, 800), Image.Resampling.LANCZOS)
            img.save(out_path, "WEBP", quality=85, method=6)
            print(f"[{card_id}/78] Saved {out_path} from {src_filename}")
            return True
    except Exception as e:
        print(f"Error downloading {card_id} ({src_filename}): {e}")
        return False

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Downloading and converting 78 tarot cards to WebP into {OUTPUT_DIR}...")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(process_card, sorted(MAPPING.items())))
        
    success_count = sum(1 for r in results if r)
    print(f"Finished: {success_count}/78 cards downloaded and converted to WebP successfully.")

if __name__ == "__main__":
    main()
