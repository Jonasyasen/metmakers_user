from fastapi import FastAPI
from pydantic import BaseModel

# إنشاء تطبيق FastAPI
app = FastAPI()

# تعريف نموذج بيانات باستخدام Pydantic
class Item(BaseModel):
    name: str
    description: str | None = None  # وصف اختياري
    price: float
    tax: float | None = None  # قيمة ضريبة اختيارية

# نقطة النهاية الرئيسية التي تعرض رسالة ترحيبية
@app.get("/")
async def read_root():
    return {"message": "مرحباً بكم في FastAPI!"}

# نقطة النهاية لاسترجاع عنصر بناءً على معرفه ومعامل استعلام اختياري
@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}

# نقطة النهاية لإنشاء عنصر جديد باستخدام طريقة POST
@app.post("/items/")
async def create_item(item: Item):
    return {"item": item}
