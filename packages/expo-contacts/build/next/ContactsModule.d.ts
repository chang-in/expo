import { EventSubscription, NativeModule } from 'expo-modules-core';
import { Contact as ContactType } from './types/Contact';
import { Container as ContainerType } from './types/Container';
import { Group as GroupType } from './types/Group';
type ExpoContactsEvents = {
    contactsDidChange: () => void;
};
declare class ExpoContactsModule extends NativeModule<ExpoContactsEvents> {
    ContactNext?: typeof ContactType;
    Contact: typeof ContactType;
    Group: typeof GroupType;
    Container: typeof ContainerType;
}
declare const expoContactsModule: ExpoContactsModule;
/**
 * Represents a contact in the device's address book.
 *
 * - Data Retrieval:
 * Contact details can be accessed using the `getDetails` method
 * or via specific getters such as `getEmails` and `getPhones`.
 *
 * - Modification:
 * To update the contact, use bulk operations via `patch` or `update`,
 * or specific modifiers like `addEmail` and `deletePhone`.
 * @example
 * ```ts
 * const contact = await Contact.create({
 *    givenName: 'John',
 *    familyName: 'Doe',
 *    phones: [{ label: 'mobile', number: '+12123456789' }]
 * });
 * ```
 */
export declare class Contact extends expoContactsModule.Contact {
}
declare const Group_base: typeof GroupType;
/**
 * Represents a group of contacts (for example, "Family", "Coworkers").
 * Groups belong to a specific Container and can contain multiple Contacts.
 * @platform ios
 */
export declare class Group extends Group_base {
}
declare const Container_base: typeof ContainerType;
/**
 * Represents a container for contacts.
 * A container (often called an "Account" in UI terms) is a source of contacts, such as a local device storage, iCloud, Google, or Exchange account.
 * @platform ios
 */
export declare class Container extends Container_base {
}
/**
 * Adds a listener for contact changes. The listener will be called whenever contacts are added, updated, or deleted.
 *
 * **Platform differences:**
 * - **Android**: 5-7 second delay - uses `ContentObserver` with inherent system delays
 * - **iOS**: Immediate response - uses `CNContactStoreDidChangeNotification`
 *
 * The Android delay is a system limitation that affects all apps using `ContentObserver` for contacts.
 * This delay is by design to batch notifications for better performance and battery life.
 * For more immediate updates, you can also listen to app state changes and refresh
 * contacts when the app comes to the foreground. This ensures users see the latest contacts when
 * returning from the native Contacts app.
 *
 * @param listener The function that will be executed when contacts change.
 * This function accepts no arguments.
 *
 * @returns A subscription object with a `remove` method to stop listening.
 * @example
 * ```jsx
 * const subscription = Contacts.addContactChangeListener(() => {
 *   console.log('Contacts changed - refreshing contact list');
 *   // Refresh your contact list when changes are detected
 *   loadContacts();
 * });
 *
 * // Later, remove the listener
 * subscription.remove();
 * ```
 */
export declare function addContactsChangeListener(listener: () => void): EventSubscription;
export declare function removeAllContactsChangeListeners(): void;
export {};
//# sourceMappingURL=ContactsModule.d.ts.map