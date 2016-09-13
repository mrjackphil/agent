import {ClassArray} from '../../ClassArray';
import {UhkBuffer} from '../../UhkBuffer';
import {DelayMacroAction} from './DelayMacroAction';
import {KeyMacroAction} from './KeyMacroAction';
import {MacroAction, MacroActionId, macroActionType} from './MacroAction';
import {MouseButtonMacroAction} from './MouseButtonMacroAction';
import {MoveMouseMacroAction} from './MoveMouseMacroAction';
import {ScrollMouseMacroAction} from './ScrollMouseMacroAction';
import {TextMacroAction} from './TextMacroAction';

export class MacroActions extends ClassArray<MacroAction> {

    jsObjectToClass(jsObject: any): MacroAction {
        switch (jsObject.macroActionType) {
            case macroActionType.KeyMacroAction:
                return new KeyMacroAction().fromJsObject(jsObject);
            case macroActionType.MouseButtonMacroAction:
                return new MouseButtonMacroAction().fromJsObject(jsObject);
            case macroActionType.MoveMouseMacroAction:
                return new MoveMouseMacroAction().fromJsObject(jsObject);
            case macroActionType.ScrollMouseMacroAction:
                return new ScrollMouseMacroAction().fromJsObject(jsObject);
            case macroActionType.DelayMacroAction:
                return new DelayMacroAction().fromJsObject(jsObject);
            case macroActionType.TextMacroAction:
                return new TextMacroAction().fromJsObject(jsObject);
            default:
                throw `Invalid MacroAction.macroActionType: "${jsObject.macroActionType}"`;
        }
    }

    binaryToClass(buffer: UhkBuffer): MacroAction {
        let macroActionFirstByte = buffer.readUInt8();
        buffer.backtrack();

        if (buffer.enableDump) {
            process.stdout.write(']\n');
            buffer.enableDump = false;
        }

        if (macroActionFirstByte >= MacroActionId.KeyMacroAction && macroActionFirstByte <= MacroActionId.LastKeyMacroAction) {
            return new KeyMacroAction().fromBinary(buffer);
        }
        switch (macroActionFirstByte) {
            case MacroActionId.MouseButtonMacroAction:
                return new MouseButtonMacroAction().fromBinary(buffer);
            case MacroActionId.MoveMouseMacroAction:
                return new MoveMouseMacroAction().fromBinary(buffer);
            case MacroActionId.ScrollMouseMacroAction:
                return new ScrollMouseMacroAction().fromBinary(buffer);
            case MacroActionId.DelayMacroAction:
                return new DelayMacroAction().fromBinary(buffer);
            case MacroActionId.TextMacroAction:
                return new TextMacroAction().fromBinary(buffer);
            default:
                throw `Invalid MacroAction first byte: ${macroActionFirstByte}`;
        }
    }
}
