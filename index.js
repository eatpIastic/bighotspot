/// <reference types="../CTAutocomplete" />

const key = new KeyBind("say hotspot", Keyboard.KEY_NONE, "big");
const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");


register("tick", () => {
    if (!key.isPressed()) return;

    let hotspots = World.getAllEntities().filter(e => e.entity instanceof EntityArmorStand && e.getName().removeFormatting() == "HOTSPOT" && e.distanceTo(Player.getPlayer()) < 20);

    if (hotspots.length == 0) {
        ChatLib.chat(`&7> &cNo Hotspots Nearby`);
        return;
    }

    let nearbyArmorstand = World.getWorld().func_72839_b(hotspots[0].entity, hotspots[0].entity.func_174813_aQ().func_72314_b(1, 5, 1)).filter(e => e instanceof EntityArmorStand)?.[0];
    if (!nearbyArmorstand) {
        ChatLib.chat(`&7> &cError detecting hotspot type`);
    }

    nearbyArmorstand = new EntityLivingBase(nearbyArmorstand);

    let chatStr = `x: ${Math.floor(nearbyArmorstand.getX())}, y: ${Math.floor(nearbyArmorstand.getY())}, z: ${Math.floor(nearbyArmorstand.getZ())}   ${nearbyArmorstand.getName().removeFormatting()}`;
    ChatLib.say(chatStr);
});
