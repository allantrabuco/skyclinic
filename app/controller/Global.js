/*
 * File: app/controller/Global.js
 */

Ext.define('skyclinic.controller.Global', {
    extend: 'Ext.app.Controller',
    alias: 'controller.global',

    models: [
        'Settings'
    ],
    stores: [
        'Settings',
        'Messages'
    ],

    toFocus: function(fields) {
        var me = this,
            items = fields;

        Ext.Object.each(items, function(idx, field) {
            var fld = field;
            if ((fld.xtype === 'textfield' ||
                fld.xtype === 'numberfield' ||
                fld.xtype === 'combobox') && (fld.isVisible())) {
                fld.focus(true);
                return false;

            }
        });
    },

    filterRecords: function(scope, store, fields, valueField, idField) {
        /**
         * pesquisas/filtros locais
         *
         */

        var me = scope,
            value = valueField,
            meStore = store,
            meFields = fields,
            meIdField = idField;

        meStore.clearFilter(true);

        Ext.Array.each(meFields, function(field, ix) {
            var name = field.name;

            if (name !== meIdField) {
                meStore.filter({
                    anyMatch: true,
                    property: field.name,
                    value: value
                });

                if (meStore.count() > 0) {
                    return false;
                } else {
                    meStore.clearFilter(true);
                }
            }
        });
    },

    searchRecord: function(scopeP, storeP, textfieldP, idP, advFilterP) {
        /**
         * Função para filtro remoto
         * @public
         *
         * Sintaxe: me.getController('Global').searchRecord(scopeP, storeP, textfieldP, idP, advFilterP);
         */

        var me = scopeP,
            store = storeP,
            textfield = textfieldP,
            id = idP,
            advFilter = advFilterP,
            value = textfield.getValue();

        store.clearData();
        store.removeAll();

        store.currentPage = 1;

        store.load({
            scope: me,
            params: {
                page: 1,
        //        id: id,
                findValue: value,
                advancedFilter: advFilter
            },
            callback: function(records, operation, success) {
                textfield.focus(true);

                if (value.length === 0) {
                    store.search = false;
                } else {
                    store.search = true;
                }
            }
        });
    },

    goback: function(savBtnP) {
        /**
         * utilizado principalmente para o uso de botao 'mais' ( + ) de
         * combob para inserir/alterar informacoes na janela principal
         * do item
         *
         */

        var me = this,
            savBtn = savBtnP,
            realViewport = me.getMyViewportController().getRealViewportRef(),
            menuPanel = {},
            fromPanel = {},
            toPanel = {},
            from = savBtn.from,
            to = savBtn.to;

        if (!Ext.isEmpty(from)) {
        //    savBtn.cmbStore.load();

            menuPanel = realViewport.down('panel[name=menu]');
            fromPanel = realViewport.down('panel[name=' + from + ']');
            toPanel = realViewport.down('panel[name=' + to + ']');

            toPanel.setVisible(false);
            fromPanel.setVisible(true);
            menuPanel.setDisabled(false);

            savBtn.to = '';
            savBtn.from = '';
        }

    },

    cancelOperation: function(scopeP, positionP, storeP, tabTextP, tabPanelAlias, formPanelAlias, functionP) {
        /**
         * Função para cancelar operações de edição
         * @public
         *
         * Sintaxe: me.getController('Global').cancelOperation(scopeP, positionP, storeP, tabTextP, tabPanelAlias, formPanelAlias, functionP);
         */

        var me = this,
            scope = scopeP,
            store = storeP,

            tabText = tabTextP,

            tabPanel = positionP.up(tabPanelAlias),
            formPanel = tabPanel.down(formPanelAlias),
            form = formPanel.getForm(),

            addBtn = formPanel.down('button[action=add]'),
            savBtn = formPanel.down('button[action=save]'),
            canBtn = formPanel.down('button[action=cancel]'),

            fn = functionP;


        store.remoteFilter = false;
        store.clearFilter();

        addBtn.setDisabled(false);
        savBtn.setDisabled(true);


        if ((savBtn.recordId !== -1) || (form.isDirty)) {
            Ext.MessageBox.show({
                title: 'Registro em edição!',
                msg: 'Tem certeza que deseja cancelar a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(btn) {
                    if (btn == 'yes') {
                        me.doResetForm(form, savBtn);

                        me.tabFocus(tabPanel, tabText);

                        me.message('<b>' + store.getProxy().config.msg + '</b><p>Operação cancelada!', 'w');
                        form.getFields().items[0].focus(true);
                        savBtn.recordId = -1;

                        if (!Ext.isEmpty(fn)) {
                            fn();
                        }
                    }
                }
            });

        } else {

            me.doResetForm(form, savBtn);

            me.tabFocus(tabPanel, tabText);

            me.message('<b>' + store.getProxy().config.msg + '</b><p>Operação cancelada!', 'w');
            form.getFields().items[0].focus(true);
            savBtn.recordId = -1;

            if (!Ext.isEmpty(fn)) {
                fn();
            }
        }
    },

    doResetForm: function(formP, savBtnP) {
        /**
         * limpar formulario
         *
         */

        var me = this,
            form = formP,
            savBtn = savBtnP;

        me.doCleanForm(form, me);
        form.reset();
        savBtn.recordId = 0;

    },

    deleteRecord: function(scopeP, storeP, positionP, idP, tabTextP, tabPanelAlias, formPanelAlias, functionP, messageP) {
        /**
         * Função para apagar registros
         * @public
         *
         * Sintaxe: me.getController('Global').deleteRecord(scopeP, storeP, positionP, idP, tabTextP, tabPanelAlias, formPanelAlias, functionP, messageP);
         */

        var me = this,
            scope = scopeP,
            store = storeP,
            position = positionP,
            grid = {},
            id = idP,

            tabText = '',

            tabPanel = {},
            formPanel = {},
            form = {},

            addBtn = {},
            savBtn = {},
            canBtn = {},

            fn = functionP,

            msg = messageP,

            justDelete = false;


        tabText = tabTextP;

        if (!Ext.isEmpty(tabText)) {
            tabPanel = positionP.up(tabPanelAlias);
            grid = tabPanel.down(gridPanelAlias);
            formPanel = tabPanel.down(formPanelAlias);
            form = formPanel.getForm();

            addBtn = formPanel.down('button[action=add]');
            savBtn = formPanel.down('button[action=save]');
            canBtn = formPanel.down('button[action=cancel]');
        } else {
            formPanel = position;
            grid = formPanel;
            justDelete = true;
        }

        Ext.MessageBox.show({
            title: 'Apagar registro!',
            msg: msg,
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remoteFilter = false;
                    store.clearFilter();

                    formPanel.setLoading('Removendo...');

                    Ext.Ajax.request({
                        method: 'DELETE',
                        headers: {
                            accept: 'application/json'
                        },
                        params: {
                            id: id
                        },
                        scope: scope,
                        url: store.getProxy().config.url,
                        callback: function(options, success, response) {

                            if (success) {
                                var decoded = Ext.decode(response.responseText);

                                if (decoded.errorNumber === '00000') {
                                    store.load({
                                        scope: me,
                                        callback: function(records, operation, success) {

                                            me.message('<b>' + store.getProxy().config.msg + '</b><p>Registro removido com sucesso!</p>', 's');

                                            if (justDelete) {
                                                if (savBtn.recordId === id) {
                                                    me.doResetForm(form, savBtn);
                                                    savBtn.recordId = -1;
                                                    addBtn.setDisabled(false);
                                                    savBtn.setDisabled(true);
                                                }
                                            }

                                            formPanel.setLoading(false);

                                            if (!Ext.isEmpty(fn)) {
                                                fn();
                                            }
                                        }
                                    });
                                } else {
                                    me.message('<b>' + store.getProxy().config.msg + '</b><p>Erro ao tentar remover o registro!</p>', 'e');
                                    formPanel.setLoading(false);

                                    Ext.MessageBox.show({
                                        title: 'Erro ao tentar remover o registro!',
                                        msg: decoded.errorNumber + '<br/><br/>' + decoded.result,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });

                                }

                            } else {
                                me.application.message('A conexão ao servidor falhou!', 'e');
                                formPanel.setLoading(false);
                            }
                        }
                    });
                }
            }
        });
    },

    saveRecord: function(scopeP, positionP, storeP, idFieldP, idP, tabTextP, tabPanelAlias, gridPanelAlias, formPanelAlias, functionP, fieldsOutForm, parameters) {
        /**
         * Função para gravar registro
         * @public
         *
         * Sintaxe: me.getController('Global').saveRecord(scopeP, positionP, storeP, idFieldP, idP, tabTextP, tabPanelAlias, gridPanelAlias, formPanelAlias, functionP);
         */

        var me = this,
            scope = scopeP,
            store = storeP,
            idField = idFieldP,
            id = idP,

            tabText = '',

            tabPanel = {},
            grid = {},
            formPanel = {},
            form = {},

            addBtn = {},
            savBtn = {},
            canBtn = {},

            fn = functionP,

            more = fieldsOutForm,
            params = parameters,
            metodo = 'POST',

            extraParams = [],
            dirtyFields = [],
            justSave = false,
            goSave = false;

        tabText = tabTextP;

        if (!Ext.isEmpty(tabText)) {
            tabPanel = positionP.up(tabPanelAlias);
            grid = tabPanel.down(gridPanelAlias);
            formPanel = tabPanel.down(formPanelAlias);
            form = formPanel.getForm();

            addBtn = formPanel.down('button[action=add]');
            savBtn = formPanel.down('button[action=save]');
            canBtn = formPanel.down('button[action=cancel]');
        } else {
            formPanel = positionP;
            grid = formPanel;
            justSave = true;
        }


        store.remoteFilter = false;
        store.clearFilter();

        formPanel.setLoading('Gravando...');

        if (!justSave) {
            if (form.isDirty() || !Ext.isEmpty(more)) {
                dirtyFields = me.dirtyFields(form);
                goSave = true;
            }
        } else {
            goSave = true;
        }

        if (id <= 0) {
        //    metodo = 'PUT';
            url = store.getProxy().config.url.replace('grid','save');
        } else {
            url = store.getProxy().config.url.replace('grid','save');
        }


        if (goSave) {
            if (!Ext.isEmpty(params)) {
                Ext.Array.each(params, function(item, idx) {
                    extraParams.push(item);
                });
            }

            if (!Ext.isEmpty(more)) {
                Ext.Array.each(more, function(item, idx) {
                    dirtyFields.push(item);
                });
            }

            me.message('<img src="./resources/images/loading.gif" width="16px" height="16px" /> <span>Gravando ' + store.getProxy().config.msg + '...</span>', 'i');

            Ext.Ajax.request({
                method: metodo,
                headers: {
                    accept: 'application/json'
                },
                params: {
                    id: id,
                    extraParams: Ext.JSON.encode(extraParams),
                    info: Ext.JSON.encode(dirtyFields)
                },
                scope: scope,
                url: url, //store.getProxy().config.url,
                callback: function(options, success, response) {
                    if (success) {
                        if (response.responseText.search('errorNumber') > -1) {
                            var decoded = Ext.decode(response.responseText);

                            if (decoded.errorNumber === '00000') {
                                me.message('<b>' + store.getProxy().config.msg + '</b><p>Registro gravado com sucesso!</p>', 's');

                                store.load({
                                    scope: me,
                                    callback: function(records, operation, success) {
                                        var id = decoded.id,
                                            rec = store.findRecord(idField, id),
                                            idx = store.indexOf(rec);

                                        grid.getSelectionModel().select(idx);

                                        if (!justSave) {
                                            addBtn.setDisabled(false);

                                            me.doResetForm(form, savBtn);

                                            me.tabFocus(tabPanel, tabText);

                                            form.getFields().items[0].focus(true);
                                            savBtn.recordId = -1;
                                        }

                                        formPanel.setLoading(false);


                                        if (!Ext.isEmpty(fn)) {
                                            fn();
                                        }
                                    }
                                });
                            } else {

                                me.message('<b>' + store.getProxy().config.msg + '</b><p>Erro ao tentar gravar o registro!</p><p>' + decoded.errorNumber + '</p>', 'e');
                                formPanel.setLoading(false);
                                if (!Ext.isEmpty(fn)) {
                                    fn();
                                }
                            }
                        } else {
                            me.message('<b>' + store.getProxy().config.msg + '</b><p>Erro ao tentar gravar o registro!</p><p>' + response.responseText + '</p>', 'e');
                            formPanel.setLoading(false);
                        }

                    } else {
                        me.message('A conexão ao servidor falhou!', 'e');
                        formPanel.setLoading(false);
                        if (!Ext.isEmpty(fn)) {
                            fn();
                        }
                    }
                }
            });

        } else {
            me.message('Não foram feitas alterações!', 'w');
            formPanel.setLoading(false);
        }
    },

    addRecord: function(scopeP, positionP, storeP, tabTextP, tabPanelAlias, formPanelAlias, functionP) {
        /**
         * Função para adicionar novo registro (validar edição e limpar formulário)
         * @public
         *
         * Sintaxe: me.getController('Global').addRecord(scopeP, positionP, storeP, tabTextP, tabPanelAlias, formPanelAlias, functionP);
         */

        var me = this,
            scope = scopeP,
            store = storeP,

            tabText = tabTextP,

            tabPanel = positionP.up(tabPanelAlias),
            formPanel = tabPanel.down(formPanelAlias),
            form = formPanel.getForm(),

            addBtn = formPanel.down('button[action=add]'),
            savBtn = formPanel.down('button[action=save]'),
            canBtn = formPanel.down('button[action=cancel]'),

            fn = functionP;

        if ((savBtn.recordId !== -1) || (form.isDirty())) {
            Ext.MessageBox.show({
                title: 'Registro em edição!',
                msg: 'Tem certeza que deseja continuar a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(btn) {

                    if (btn == 'yes') {
                        /* TODO: criar função para isso!!! */
                        store.remoteFilter = false;
                        store.clearFilter();

                        formPanel.setDisabled(false);

                        me.doResetForm(form, savBtn);
                        form.isValid();

                        savBtn.recordId = 0;

                        addBtn.setDisabled(false);

                        me.message('<b>' + store.getProxy().config.msg + '</b><p>Pronto para o novo registro!</p>', 'i');

                        me.tabFocus(tabPanel, tabText);
                        me.toFocus(form.getFields().items);

                        if (!Ext.isEmpty(fn)) {
                            fn();
                        }

                    }
                }
            });
        } else {
            /* TODO: criar função para isso!!! */
            store.remoteFilter = false;
            store.clearFilter();

            formPanel.setDisabled(false);

            me.doCleanForm(form, scope);
            form.reset();
            form.isValid();

            savBtn.recordId = 0;

            addBtn.setDisabled(false);

            me.message('<b>' + store.getProxy().config.msg + '</b><p>Pronto para o novo registro!</p>', 'i');

            me.tabFocus(tabPanel, tabText);
            me.toFocus(form.getFields().items);

            if (!Ext.isEmpty(fn)) {
                fn();
            }

        }
    },

    editRecord: function(scopeP, idP, recordP, gridP, tabTextP, tabPanelAlias, formPanelAlias, functionP) {
        /**
         * Função para editar registros
         * @public
         *
         * Sintaxe: me.getController('Global').editRecord(scopeP, idP, recordP, gridP, tabTextP, tabPanelAlias, formPanelAlias, functionP);
         */

        var me = this,
            scope = scopeP,
            id = idP,
            record = recordP,
            grid = gridP,
            tabText = tabTextP,

            tabPanel = grid.up(tabPanelAlias),
            formPanel = tabPanel.down(formPanelAlias),
            form = formPanel.getForm(),

            addBtn = formPanel.down('button[action=add]'),
            savBtn = formPanel.down('button[action=save]'),
            canBtn = formPanel.down('button[action=cancel]'),

            fn = functionP;

            if ((savBtn.recordId !== -1) || (form.isDirty())) {
            Ext.MessageBox.show({
                title: 'Registro em edição!',
                msg: 'Tem certeza que deseja continuar a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(btn) {
                    if (btn == 'yes') {
                        /* TODO: criar função para isso!!! */
                        me.doResetForm(form, savBtn);
                        form.isValid();

                        addBtn.setDisabled(false);

                        form.loadRecord(record);

                        me.tabFocus(tabPanel, tabText);

                        me.toFocus(form.getFields().items);

                        savBtn.recordId = id;

                        if (!Ext.isEmpty(fn)) {
                            fn();
                        }

                    }
                }
            });
        } else {
            /* TODO: criar função para isso!!! */
            me.doResetForm(form, savBtn);
            form.isValid();

            addBtn.setDisabled(false);

            form.loadRecord(record);

            me.tabFocus(tabPanel, tabText);
            me.toFocus(form.getFields().items);

            savBtn.recordId = id;
            if (!Ext.isEmpty(fn)) {
                fn();
            }
        }
    },

    doAutoLoadStores: function() {
        /**
         * carregar as stores necessárias
         *
         */

        var me = this,
            store = {},
            app = me.application;
        //,    proceduresComboStore = me.application.getProceduresComboStore();

        //app.getUFsStore().load();

        // stores: clean filters
        Ext.Array.each(me.stores, function(store, idx) {
            app.getStore(store).clearFilter(true);
        });
    },

    dirtyFields: function(form) {
        /**
         * obter os campos alterados no formulario
         *
         */

        var me = this,
            meForm = form,
            fields = meForm.getFields(),
            result = {},
            dirtyFields = [],
            chgField = '',
            chgValue = '';

        Ext.Array.each(fields.items, function(obj, idx) {
            var meObj = obj, dirtyField = {}, found = false, isDirty = false;

            if (meObj.xtype !== 'radiogroup' && meObj.xtype !== 'checkboxgroup') {
                if (meObj.xtype === 'checkboxfield') {
                    isDirty = true;
                }

                if (meObj.isDirty() || isDirty) {

                    dirtyField.field = meObj.getName();

                    Ext.Object.each(meForm.getValues(), function(field, value) {
                        var meField = field,
                            meValue = value;
                        if (meField === meObj.getName()) {
                            dirtyField.value = meValue;
                        }
                    });

                    Ext.Array.each(dirtyFields, function(object, index) {
                        var meObject = object, meIndex = index;

                        if (Ext.Object.equals(dirtyFields[meIndex], dirtyField)) {
                            found = true;
                        }
                    });
                    if (!found) dirtyFields.push(dirtyField);
                }
            }
        });

        result.data = dirtyFields;
        return dirtyFields;
    },

    message: function(content, type) {
        var me = this,
            meContent = content,
            meType = type,
            msgStore = me.getMessagesStore(),
            msgText = '',
            msg = [],
            cmbMsg = Ext.ComponentQuery.query('combo[name=cmbMessages]')[0];

        switch (meType) {
            case 'n': meType = 'notification'; break;
            case 'i': meType = 'information'; break;
            case 's': meType = 'success'; break;
            case 'w': meType = 'warning'; break;
            case 'e': meType = 'error'; break;
        }

        if (meType === 'error' || meType === 'warning') {
            Ext.ux.Alert.alert('Notification', meContent, meType);
        }

        meContent = meContent.replace('<img src="./resources/images/loading.gif" width="16px" height="16px" /> <span>','');
        meContent = meContent.replace('</span>','');
        meContent = meContent.replace('<b>','');
        meContent = meContent.replace('</b>',': ');
        meContent = meContent.replace('<p>','');
        meContent = meContent.replace('</p>','');

        msgText = Ext.Date.format(new Date(), 'Y-m-d H:i:s') + ' - ' + meContent;


        if (msgStore.count() === 0) {
            msg.push({msgText:msgText});
        } else {
            Ext.Array.each(msgStore.data.items, function(recs, idx) {
                if (recs.data.msgText.length > 0) {
                    msg.push(recs.data);
                }
            });
            msg.push({msgText:msgText});
        }

        msgStore.removeAll(true);
        msgStore.loadData(msg, false);
        if (!Ext.isEmpty(cmbMsg)) cmbMsg.select(msgStore.data.items[0].data.msgText);


        /*
        Ext.ux.Alert.alert('Notification', 'Message Notification!', 'notification');
        Ext.ux.Alert.alert('Information', 'Message Information!', 'information');
        Ext.ux.Alert.alert('Success', 'Message Success!', 'success');
        Ext.ux.Alert.alert('Warning', 'Message Warning!', 'warning');
        Ext.ux.Alert.alert('Error', 'Message Error!', 'error');
        */

    },

    doCleanForm: function(form, self) {
        /**
         * realizar a 'limpeza' do formulario
         *
         */

        var me = this,
            meForm = form;

        Ext.Array.each(meForm.getFields().items, function(field, idx) {
            field.originalValue = null;
            field.setValue();
            field.resetOriginalValue();

            if (field.xtype === 'radiofield' || field.xtype === 'checkboxfield') {
                field.setRawValue(false);
            }
        });

        meForm.reset();
        meForm.setValues(form.getValues());
    },

    setDisabledForm: function(form, disabled) {
        /**
         * habilitar/desabilitar o formulario
         *
         */

        var me = this,
            meForm = form,
            meDisabled = disabled;

        Ext.Array.each(meForm.getFields().items, function(field, idx) {
            field.setDisabled(meDisabled);
        });
    },

    generateData: function(n, floor) {
        /**
         * funcao temporaria para os graficos
         *
         */

        var data = [],
            p = (Math.random() * 11) + 1,
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    },

    tabFocus: function(tab, tabTxt) {
        var me = this,
            tabPanel = tab,
            tabText = tabTxt;

        Ext.Array.each(tabPanel.getTabBar().items.items, function(tab, idx) {
            var tb = tab;

            if (tb.text === tabText) {
                tb.setDisabled(false);
                tabPanel.setActiveTab(idx);
                tabPanel.doLayout();
                return false;
            }
        });

    },

    createTmpWindow: function(viewUserClassName) {
        /**
         * Criar janela temporária
         * @public
         *
         * Sintaxe: me.getController('Global').createTmpWindow(userClassName);
         */

        var me = this,
            view = me.application.getView(viewUserClassName).create(),
            window = me.application.getView('WinAuxiliary').create();

        window.setTitle(view.winTitle);
        window.add(view);
        window.doLayout();
        window.show();
    },

    onLaunch: function() {
        var me = this,
            today = new Date(),
            //loading = Ext.ComponentQuery.query('container[name=loading]')[0],
            codProdTest = /^\d{2}.\d{3}.\d{3}.\d{3}.\d{4}-\d{1}$/i;


        // Carrega dados para os graficos de exemplo
        //me.getController('ChartExample').doLoad();

        if (!Ext.isEmpty(Ext.get('loading'))) {
            Ext.onReady(function(){
                setTimeout(function(){
                    Ext.get('loading').remove();
                }, 250);
            });
        }


        Ext.apply(Ext.form.field.VTypes, {
            daterange: function(val, field) {
                var date = field.parseDate(val);

                if (!date) {
                    return false;
                }

                if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                    var start = field.up('form').down('datefield[name=' + field.startDateField + ']');
                    start.setMaxValue(date);
                    start.validate();
                    this.dateRangeMax = date;
                }
                else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                    var end = field.up('form').down('datefield[name=' + field.endDateField + ']');
                    end.setMinValue(date);
                    end.validate();
                    this.dateRangeMin = date;
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },

            daterangeText: 'O período inicial deve ser maior que o período final',

            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: 'Passwords do not match'
        });



        window.onbeforeunload = function (e) {
            var viewport = Ext.ComponentQuery.query('myviewport');

            if (!Ext.isEmpty(viewport)) {
                if(!e) e = window.event;
                //e.cancelBubble is supported by IE - this will kill the bubbling process.
                e.cancelBubble = true;
                e.returnValue = 'Tem certeza que deseja abandonar a aplicação?'; //This is displayed on the dialog

                //e.stopPropagation works in Firefox.
                if (e.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        };

        //Ext.util.Observable.observe(Ext.data.Connection);

        me.getSettingsStore().load({
            callback: function(records, operation, success) {

                var recs = records;

                if (!Ext.isEmpty(recs)) {
                    var rec = recs[0];

                    switch (rec.data.environment) {
                        case 0:	// desv
                            me.server = rec.data.serverD;
                            break;
                        case 1:	// test
                            me.server = rec.data.serverT;
                            break;
                        case 2:	// qual
                            me.server = rec.data.serverQ;
                            break;
                        case 3:	// prod
                            me.server = rec.data.serverP;
                            break;
                    }
                } else {
                    me.server = window.location.href.slice(0, -1);
                }


                Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
                    var meOpts = options,
                        ctrlGlobal = me.getController('Global');

                    if (meOpts.url.search("http://") === -1) {
                        if (meOpts.url.substring(0,1) !== '.') {
                            meOpts.url = ctrlGlobal.server + options.url;
                        }
                    }

                    if (!Ext.isEmpty(meOpts.proxy)) {
                        me.message('<img src="./resources/images/loading.gif" width="16px" height="16px" /> <span>Carregando ' + meOpts.proxy.config.msg + '...</span>', 'i');
                    }
                });


                Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
                    var meOpts = options;

                    if (!Ext.isEmpty(meOpts.proxy)) {

                        if (!Ext.isEmpty(meOpts.proxy.config.msgDone)) me.message(meOpts.proxy.config.msgDone, 's');
                        if (!Ext.isEmpty(meOpts.proxy.config.combo)) {
                            Ext.Array.each(meOpts.proxy.config.combo, function(storeCmb, idx) {
                                store = me.getStore(storeCmb);
                                if (store.count() > 0) {
                                    store.clearFilter();
                                    store.load();
                                }
                            });
                        }
                    }
                });


                Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
                    var meOpts = options,
                        respdec = {},
                        error = "";

                    if (response.status === 200) {
                        respdec = (response.responseText.length !== 0 ? Ext.decode(response.responseText) : "");

                        if (!Ext.isEmpty(meOpts.proxy.config.msg)) {

                            if (respdec.length === 0) {
                                respdec = {MessageDetail: meOpts.url, Message: "Erro ao tentar acessar o servidor"};
                            }

                            if (!Ext.isEmpty(respdec.ExceptionMessage)) {
                                error = respdec.ExceptionMessage.split(" :    em")[0];
                            } else {
                                error = respdec.Message + '<br/>' + respdec.MessageDetail;
                            }

                            if (!Ext.isEmpty(meOpts.proxy)) {
                                me.message(meOpts.proxy.config.msgException + '<p>' + error + '</p>', 'e');
                            }
                        }
                    } else {
                        if (!Ext.isEmpty(meOpts.proxy)) {
                            me.message(meOpts.proxy.config.msgException + ' <p>' + response.status + ': ' + response.statusText + '</p>', 'e');
                        }
                    }
                });

            }
        });

        me.getController('Login').getMainRef().query('textfield')[0].focus(true);
    }

});
